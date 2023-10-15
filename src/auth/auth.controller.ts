import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.AuthService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.AuthService.registration(userDto);
  }
}
