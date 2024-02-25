import {
  Body, Controller, Post, Res, UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { HttpResponseFormat } from '../common/filters/http-response-format.filter';
import { AuthService } from './auth.service';
import { SigninDTO } from './dtos/signin.dto';
import { SignupDTO } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  @UseInterceptors(HttpResponseFormat)
  async signup(
  @Res({ passthrough: true }) response: Response,
    @Body() signup: SignupDTO,
  ) {
    const user = await this.authService.signup(signup);
    response.cookie(
      this.configService.getOrThrow('auth.cookie.name'),
      this.jwtService.sign({ id: user.id }),
      {
        httpOnly: true,
        expires: new Date(
          Date.now() + this.configService.getOrThrow<number>('auth.cookie.ttl'),
        ),
      },
    );
    return user;
  }

  @Post('signin')
  @UseInterceptors(HttpResponseFormat)
  async signin(
  @Res({ passthrough: true }) response: Response,
    @Body() signup: SigninDTO,
  ) {
    const user = await this.authService.signin(signup);
    response.cookie(
      this.configService.getOrThrow('auth.cookie.name'),
      this.jwtService.sign({ id: user.id }),
      {
        httpOnly: true,
        expires: new Date(
          Date.now() + this.configService.getOrThrow<number>('auth.cookie.ttl'),
        ),
      },
    );
    return user;
  }

  @Post('signout')
  @UseInterceptors(HttpResponseFormat)
  async signout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(this.configService.getOrThrow('auth.cookie.name'));
  }
}
