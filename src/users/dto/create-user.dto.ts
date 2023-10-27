import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'Alexander' })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly firstName: string;

  @ApiProperty({ description: 'Фамилия пользователя', example: 'Kataev' })
  @IsString({ message: 'Фамилия должна быть строкой' })
  readonly lastName: string;

  @ApiProperty({ description: 'Почта', example: 'user@gmail.com' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ description: 'Пароль', example: 'qweqwe123' })
  @Length(4, 16, { message: 'Пароль должен содержать от 4 до 16 символов' })
  readonly password: string;
}
