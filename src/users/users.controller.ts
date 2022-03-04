import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  Put,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto, PasswordUpdateDto, UpdateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(@Res() res: Response): Promise<Response> {
    const users = await this.userService.getUsers();

    if (!users || users.length < 1) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Users not found! Sorry!',
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Users found!',
      users,
    });
  }

  @Get(':id')
  async getUser(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.getUser(id);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `User with id "${id}" no found! Sorry`,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'User found!',
      user,
    });
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const verifyEmail: boolean = await this.userService.verifyDuplicates({
      email: createUserDto.email,
    });

    const verifyUsername: boolean = await this.userService.verifyDuplicates({
      username: createUserDto.username,
    });

    if (verifyEmail) {
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: `User with email "${createUserDto.email}" already exists.`,
      });
    }

    if (verifyUsername) {
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: `Username "${createUserDto.username}" already exists.`,
      });
    }

    const user = await this.userService.createUser(createUserDto);

    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'User no create! Sorry',
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'User Created!',
      user,
    });
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { email, username } = updateUserDto;

    const verifyEmail: any = await this.userService.verifyDuplicates({
      email: updateUserDto.email,
    });

    const verifyUsername: any = await this.userService.verifyDuplicates({
      username: updateUserDto.username,
    });

    if (verifyEmail && verifyEmail.email != email) {
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: `User with email "${updateUserDto.email}" already exists.`,
      });
    }

    if (verifyUsername && verifyEmail.username != username) {
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: `Username "${updateUserDto.username}" already exists.`,
      });
    }

    const user = await this.userService.updateUser(id, updateUserDto);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'User not found! Sorry',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'User updated!',
      user,
    });
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.deleteUser(id);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `User id ${id} not found! Sorry`,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: `User with id ${id} deleted!`,
    });
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: number,
    @Body() password: PasswordUpdateDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.chagePassword(id, password);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'User not found! Sorry!',
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Password Updated!',
      user,
    });
  }
}
