import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: 'Почта', example: 'user@gmail.com' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ description: 'Пароль', example: 'qweqwe123' })
  @Length(4, 16, { message: 'Пароль должен содержать от 4 до 16 символов' })
  readonly password: string;
}
