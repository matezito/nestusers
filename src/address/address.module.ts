import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressService } from './address.service';
import { UsersService } from '../users/users.service';
import { AddressController } from './address.controller';
import { User } from '../users/user.entity';
import { Address } from './address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  providers: [AddressService, UsersService],
  controllers: [AddressController],
})
export class AddressModule {}
