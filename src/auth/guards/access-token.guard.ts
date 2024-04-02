import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../app.decorators';
import { ACCESS_TOKEN_STRATEGY } from '../auth.constants';

@Injectable()
export class AccessTokenGuard
  extends AuthGuard(ACCESS_TOKEN_STRATEGY)
  implements CanActivate
{
  constructor(private jwtService: JwtService, private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
