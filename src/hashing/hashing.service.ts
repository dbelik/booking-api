import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashingService {
  async compare(string_: string, hash: string): Promise<boolean> {
    return new Promise((resolve) => {
      bcrypt.compare(string_, hash, (error, result) => {
        if (error) {
          resolve(false);
        } else {
          resolve(result);
        }
      });
    });
  }
}
