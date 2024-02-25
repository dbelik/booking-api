import { validate } from 'class-validator';

import { SignupDTO } from '../signup.dto';

describe('SignupDTO', () => {
  let signupDTO: SignupDTO;

  beforeEach(() => {
    signupDTO = new SignupDTO();
  });

  it('should create an instance', () => {
    expect(signupDTO).toBeDefined();
  });

  it('should have an email property', async () => {
    signupDTO.email = 'test@example.com';
    signupDTO.password = 'asdASD123@';
    const validationErrors = await validate(signupDTO);
    expect(validationErrors).toHaveLength(0);
  });

  it('should validate the email property', async () => {
    signupDTO.email = 'invalid-email'; // Invalid email format
    signupDTO.password = 'asdASD123@';
    const validationErrors = await validate(signupDTO);
    expect(validationErrors).toHaveLength(1);
    expect(validationErrors[0].constraints.isEmail).toBe(
      'email must be an email',
    );
  });

  it('should validate the password property', async () => {
    signupDTO.email = 'test@example.com';
    signupDTO.password = ''; // Password is empty
    const validationErrors = await validate(signupDTO);
    expect(validationErrors).toHaveLength(1);
    expect(validationErrors[0].constraints.isStrongPassword).toBe(
      'password is not strong enough',
    );
  });
});
