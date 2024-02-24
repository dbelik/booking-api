import { IsValidTimestamp } from '../is-valid-timestamp.validator';

describe('IsValidTimestamp', () => {
  let validator: IsValidTimestamp;

  beforeEach(() => {
    validator = new IsValidTimestamp();
  });

  it('should return true for a valid timestamp string', () => {
    const validTimestamp = '1644240000000'; // Valid timestamp for '2022-02-08'
    expect(validator.validate(validTimestamp)).toBe(true);
  });

  it('should return false for an invalid timestamp string', () => {
    const invalidTimestamp = 'invalid'; // Invalid timestamp
    expect(validator.validate(invalidTimestamp)).toBe(false);
  });

  it('should return false for a negative timestamp value', () => {
    const negativeTimestamp = '-1'; // Negative timestamp value
    expect(validator.validate(negativeTimestamp)).toBe(false);
  });

  it('should return true for a timestamp equal to 0', () => {
    const zeroTimestamp = '0'; // Timestamp equal to 0
    expect(validator.validate(zeroTimestamp)).toBe(true);
  });

  it('should return false for a floating-point timestamp', () => {
    const floatingPointTimestamp = '1234.567'; // Floating-point timestamp
    expect(validator.validate(floatingPointTimestamp)).toBe(false);
  });
});
