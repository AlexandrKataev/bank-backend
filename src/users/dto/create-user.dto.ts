import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Почта', example: 'user@gmail.com' })
  readonly email: string;
  @ApiProperty({ description: 'Пароль', example: 'qweqwe123' })
  readonly password: string;
}
