import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @ApiOperation({ summary: 'Вход' })
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.AuthService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.AuthService.registration(userDto);
  }
}
