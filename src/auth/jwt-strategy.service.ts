import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../config/config';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestType) => this.extractJWT(request.cookies as object),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config().auth.cookie.secret,
    });
  }

  private extractJWT(cookies: object): string | null {
    const name = this.configService.getOrThrow<string>('auth.cookie.name');
    if (typeof cookies === 'object' && name in cookies) {
      const cookie: unknown = cookies[name];
      if (typeof cookie === 'string' && cookie.length > 0) return cookie;
    }
    return null;
  }

  async validate(payload: object): Promise<JwtPayload> {
    if ('id' in payload && typeof payload.id === 'number') {
      return { id: payload.id };
    }
    throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
  }
}
