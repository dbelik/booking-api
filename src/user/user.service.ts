import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      throw new HttpException('Invalid email or password', HttpStatus.CONFLICT);
    }
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
