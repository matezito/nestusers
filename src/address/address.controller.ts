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
} from '@nestjs/common';
import { Response } from 'express';

import { Address } from './address.entity';
import { AddressService } from './address.service';
import { UsersService } from '../users/users.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  async getAll(@Res() res: Response): Promise<Response | Address[]> {
    const address = await this.addressService.getAll();
    if (!address) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Not found addresses!',
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'All OK!',
      address,
    });
  }

  @Get(':id')
  async getAddress(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const address = await this.addressService.getAddress(id);

    if (!address) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Not found!',
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Address Found!',
      address,
    });
  }

  @Post(':user')
  async createAddress(
    @Param('user') user: number,
    @Body() createAddressDto: CreateAddressDto,
    @Res() res: Response,
  ): Promise<Response> {
    const addAddress = await this.addressService.create(user, createAddressDto);

    if (!addAddress) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error on create',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'Create!',
      addAddress,
    });
  }

  @Patch(':id')
  async updateAddress(
    @Param('id') id: number,
    @Body() UpdateAddressDto: UpdateAddressDto,
    @Res() res: Response,
  ): Promise<Response> {
    const address = await this.addressService.update(id, UpdateAddressDto);

    if (!address) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Address not found!',
      });
    }

    return res.status(HttpStatus.OK).json({
      messages: 'Address Updated!',
      address,
    });
  }

  @Delete(':id')
  async deleteAddress(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const address = await this.addressService.delete(id);

    if (!address) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Address not found!',
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Address Deleted!',
      address,
    });
  }
}
