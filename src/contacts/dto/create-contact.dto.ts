import { IsNumber, Length, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ description: 'id владельца', example: 123 })
  @IsNumber({}, { message: 'ID владельца должен быть числом' })
  readonly userId: number;

  @ApiProperty({ description: 'Имя контакта', example: 'Mark' })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly firstName: string;

  @ApiProperty({ description: 'Фамилия контакта', example: 'Poop' })
  @IsString({ message: 'Фамилия должна быть строкой' })
  readonly lastName: string;

  @ApiProperty({ description: 'Номер телефона', example: 'visa' })
  @IsNumber({}, { message: 'Номер телефона должен быть числом' })
  readonly phone: number;
}
