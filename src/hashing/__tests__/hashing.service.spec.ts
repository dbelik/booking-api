import * as bcrypt from 'bcryptjs';

import { HashingService } from '../hashing.service';

jest.mock('bcryptjs');

describe('HashingService', () => {
  let hashingService: HashingService;

  beforeEach(() => {
    hashingService = new HashingService();
  });

  describe('compare', () => {
    it('should return true if the string matches the hash', async () => {
      const string = 'password123';
      const hash = '$2a$10$N/nIGMOmDKj/rq6HhxWK3uV5LXJp.3V4e0GqysJ5qIPLjHFTmfU9q'; // Sample hash
      (bcrypt.compare as jest.Mock).mockImplementation((_, __, callback) => {
        callback(null, true);
      });

      const result = await hashingService.compare(string, hash);
      expect(result).toBe(true);
    });

    it('should return false if the string does not match the hash', async () => {
      const string = 'password123';
      const hash = '$2a$10$N/nIGMOmDKj/rq6HhxWK3uV5LXJp.3V4e0GqysJ5qIPLjHFTmfU9q'; // Sample hash
      (bcrypt.compare as jest.Mock).mockImplementation((_, __, callback) => {
        callback(null, false);
      });

      const result = await hashingService.compare(string, hash);
      expect(result).toBe(false);
    });

    it('should handle errors and return false', async () => {
      const string = 'password123';
      const hash = '$2a$10$N/nIGMOmDKj/rq6HhxWK3uV5LXJp.3V4e0GqysJ5qIPLjHFTmfU9q'; // Sample hash
      (bcrypt.compare as jest.Mock).mockImplementation((_, __, callback) => {
        callback(new Error('Some error'), false);
      });

      const result = await hashingService.compare(string, hash);
      expect(result).toBe(false);
    });
  });
});
