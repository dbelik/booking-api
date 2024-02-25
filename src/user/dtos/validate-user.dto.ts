import * as bcrypt from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

import config from '../../config/config';

export class ValidateUserDTO {
  @IsEmail()
    email: string;

  @IsStrongPassword()
  @Transform(({ value }) => {
    const salt = bcrypt.genSaltSync(config().auth.salt);
    return bcrypt.hashSync(value as string, salt);
  })
    password: string;
}
