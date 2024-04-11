import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { REFRESH_TOKEN_STRATEGY } from '../auth.constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN_STRATEGY,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: object) {
    const refreshToken = req.body['refreshToken'];

    return { ...payload, refreshToken };
  }
}
