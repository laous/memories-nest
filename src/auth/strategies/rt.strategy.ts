import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RTStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-secret',
      passReqToCallback: true, // so we can  get the token back
    });
  }

  validate(req: Request, payload: any) {
    // we extract the token here
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}
