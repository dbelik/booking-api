import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

import config from '../../config/config';

export class SignupDTO {
  @ApiProperty({
    description: 'User email',
    example: 'email@example.com',
  })
  @IsEmail()
    email: string;

  @ApiProperty({
    description: 'User password',
    example: 'asdASD123@',
  })
  @IsStrongPassword()
  @Transform(({ value }) => {
    const salt = bcrypt.genSaltSync(config().auth.salt);
    return bcrypt.hashSync(value as string, salt);
  })
    password: string;
}
