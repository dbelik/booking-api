import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiTags('auth')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New user has been created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email has already been taken.',
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiTags('auth')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully signed in.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid email or password.',
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiTags('auth')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully signed out.',
  })
  @UseInterceptors(HttpResponseFormat)
  async signout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(this.configService.getOrThrow('auth.cookie.name'));
  }
}
