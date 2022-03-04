import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class PasswordUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 12)
  readonly password: string;
}
