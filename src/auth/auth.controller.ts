import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  logout(@Req() req: any) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@Req() req: any) {
    const userId = req.user['sub'];

    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens(userId, refreshToken);
  }

  // старые эндпоинты
  // @ApiOperation({ summary: 'Вход' })
  // @Post('/login')
  // login(@Body() userDto: LoginUserDto) {
  //   return this.authService.login(userDto);
  // }

  // @ApiOperation({ summary: 'Регистрация' })
  // @Post('/registration')
  // registration(@Body() userDto: CreateUserDto) {
  //   return this.authService.registration(userDto);
  // }
}
