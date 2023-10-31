import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UserVerifyGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      const decodedJwtAccessToken = this.jwtService.decode(token) as any;

      if (bearer !== 'Bearer' || decodedJwtAccessToken.id + '' !== req.params.id + '') {
        throw new UnauthorizedException({ message: 'Нет права доступа' });
      }

      return true;
    } catch (e) {
      console.log(e);
      throw new HttpException({ message: 'Нет права доступа' }, HttpStatus.FORBIDDEN);
    }
  }
}
