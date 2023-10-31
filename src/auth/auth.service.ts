import { UsersService } from './../users/users.service';
import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.getUserByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('Пользователь с таким email уже существует');
    }

    // Hash password
    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const newUser = await this.usersService.createUser({
      ...createUserDto,
      password: hashPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.roles);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.getUserByEmail(data.email);
    if (!user) throw new BadRequestException('Пользователь не зарегистрирован');
    const passwordEquals = await bcrypt.compare(data.password, user.password);
    if (!passwordEquals) throw new BadRequestException('Неверный пароль');
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    return this.usersService.updateUser(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 5);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, email: string, roles: Role[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          roles,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          roles,
        },
        {
          secret: this.configService.get<string>(`JWT_REFRESH_SECRET`),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.getUserById(userId);

    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  //
  //
  //
  //
  // предыдущие сервисы
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload, { secret: `${process.env.JWT_ACCESS_SECRET}` }),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Некорректный email или пароль' });
  }
}
