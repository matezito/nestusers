import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto, PasswordUpdateDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['addresses'],
    });

    if (!user) {
      throw new NotFoundException('User not exists, sorry.');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user: User = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async updateUser(
    id: number,
    { name, lastname, email, username, avatar }: UpdateUserDto,
  ) {
    const user: User = await this.userRepository.preload({
      id,
      name,
      lastname,
      email,
      username,
      avatar,
    });
    if (!user) {
      throw new NotFoundException('User not exist, is not possible update');
    }

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return this.userRepository.remove(user);
  }

  async chagePassword(
    id: number,
    { password }: PasswordUpdateDto,
  ): Promise<User> {
    const user: User = await this.userRepository.preload({ id, password });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return this.userRepository.save(user);
  }

  //other methods
  async verifyDuplicates(field: object): Promise<any> {
    const user = await this.userRepository.findOne(field);
    if (user) {
      return user;
    }
    return false;
  }
}
