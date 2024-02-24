import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'timestamp', async: false })
@Injectable()
export class IsValidTimestamp implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const timestamp = Number(value);
    return (
      Number.isInteger(timestamp)
      && !Number.isNaN(timestamp)
      && timestamp >= 0
      && timestamp <= Date.now()
    );
  }
}
