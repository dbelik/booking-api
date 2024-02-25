import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config/config';
import { HashingModule } from '../hashing/hashing.module';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy.service';

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
  providers: [JwtStrategyService, UserService, AuthService],
})
export class AuthModule {}
