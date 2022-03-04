import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from './address.entity';
import { User } from '../users/user.entity';

import { CreateAddressDto, UpdateAddressDto } from './dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<Address[]> {
    const address = this.addressRepository.find({
      relations: ['user'],
    });

    if (!address) {
      throw new NotFoundException('Not found a address');
    }

    return address;
  }

  async getAddress(id: number): Promise<Address> {
    const address = this.addressRepository.findOne(id, {
      relations: ['user'],
    });

    if (!address) {
      throw new NotFoundException('Not found a address');
    }

    return address;
  }

  async create(userId: number, createAddressDto: CreateAddressDto) {
    const findeUser = await this.userRepository.findOne(userId);

    if (!findeUser) {
      throw new NotFoundException('User not found!');
    }

    const address: Address = this.addressRepository.create({
      ...createAddressDto,
      user: findeUser,
    });
    return this.addressRepository.save(address);
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address: Address = await this.addressRepository.preload({
      ...updateAddressDto,
      id,
    });

    if (!address) {
      throw new NotFoundException('Address not found!');
    }

    return this.addressRepository.save(address);
  }

  async delete(id: number) {
    const address: Address = await this.addressRepository.findOne(id);

    if (!address) {
      throw new NotFoundException('Address not found!');
    }

    return this.addressRepository.remove(address);
  }
}
