import { validate } from 'class-validator';

import { SigninDTO } from '../signin.dto';

describe('SigninDTO', () => {
  let signinDTO: SigninDTO;

  beforeEach(() => {
    signinDTO = new SigninDTO();
  });

  it('should create an instance', () => {
    expect(signinDTO).toBeDefined();
  });

  it('should have an email property', async () => {
    signinDTO.email = 'test@example.com';
    signinDTO.password = 'asdASD123@';
    const validationErrors = await validate(signinDTO);
    expect(validationErrors).toHaveLength(0);
  });

  it('should validate the email property', async () => {
    signinDTO.email = 'invalid-email'; // Invalid email format
    signinDTO.password = 'asdASD123@';
    const validationErrors = await validate(signinDTO);
    expect(validationErrors).toHaveLength(1);
    expect(validationErrors[0].constraints.isEmail).toBe(
      'email must be an email',
    );
  });

  it('should validate the password property', async () => {
    signinDTO.email = 'test@example.com';
    signinDTO.password = ''; // Password is empty
    const validationErrors = await validate(signinDTO);
    expect(validationErrors).toHaveLength(1);
    expect(validationErrors[0].constraints.isStrongPassword).toBe(
      'password is not strong enough',
    );
  });
});
