import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Length, IsUrl } from 'class-validator';

export class UpdateUserDto {
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
  @Length(4, 16)
  readonly username: string;

  @ApiProperty()
  @IsUrl()
  readonly avatar?: string;
}
