import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashingModule } from 'src/hashing/hashing.module';

import config from '../config/config';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: config().auth.cookie.secret,
      signOptions: { expiresIn: '1h' },
    }),
    HashingModule,
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
