import { IsEmail, IsStrongPassword } from 'class-validator';

export class SigninDTO {
  @IsEmail()
    email: string;

  @IsStrongPassword()
    password: string;
}
