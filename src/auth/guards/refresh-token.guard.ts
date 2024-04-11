import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_TOKEN_STRATEGY } from '../auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN_STRATEGY) {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { refreshToken } = request.body;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch (e) {
      throw new ForbiddenException();
    }

    return true;
  }
}
