import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsUrl,
  Length,
  IsObject,
} from 'class-validator';
import { Address } from '../../address/address.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 60)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 60)
  readonly lastname: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 100)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 12)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 16)
  readonly username: string;

  @ApiProperty()
  @IsUrl()
  readonly avatar?: string;

  @ApiProperty()
  @IsObject()
  readonly addresses: Partial<Address[]>;
}
