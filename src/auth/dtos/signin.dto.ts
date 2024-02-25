import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SigninDTO {
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
    password: string;
}
