import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { HashingService } from '../hashing/hashing.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SigninDTO } from './dtos/signin.dto';
import { SignupDTO } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
  ) {}

  async signup(data: SignupDTO): Promise<User> {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      throw new HttpException(
        'This email has been already taken',
        HttpStatus.CONFLICT,
      );
    }
    return this.userService.create(data);
  }

  async signin(data: SigninDTO): Promise<User> {
    const existingUser = await this.userService.findByEmail(data.email);
    if (
      !existingUser
      || !(await this.hashingService.compare(data.password, existingUser.password))
    ) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return existingUser;
  }
}
