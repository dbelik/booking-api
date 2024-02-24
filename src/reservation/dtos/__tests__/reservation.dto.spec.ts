import 'reflect-metadata';

import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ReservationDTO } from '../reservation.dto';

describe('ReservationDTO', () => {
  it('should be valid with correct properties', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.id = 1;
    reservationDTO.amenity_id = 1;
    reservationDTO.user_id = 1;
    reservationDTO.start_time = 600;
    reservationDTO.end_time = 720;
    reservationDTO.date = '1644240000000'; // Date representation for '2022-02-08'

    const errors = await validate(plainToClass(ReservationDTO, reservationDTO));
    expect(errors.length).toBe(0);
  });

  it('should not be valid if id is not an integer', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.id = 'not an integer' as any;
    reservationDTO.amenity_id = 1;
    reservationDTO.user_id = 1;
    reservationDTO.start_time = 600;
    reservationDTO.end_time = 720;
    reservationDTO.date = '1644240000000';

    const errors = await validate(plainToClass(ReservationDTO, reservationDTO));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid if amenity_id is not an integer', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.id = 1;
    reservationDTO.amenity_id = 'not an integer' as any;
    reservationDTO.user_id = 1;
    reservationDTO.start_time = 600;
    reservationDTO.end_time = 720;
    reservationDTO.date = '1644240000000';

    const errors = await validate(plainToClass(ReservationDTO, reservationDTO));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid if user_id is not an integer', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.id = 1;
    reservationDTO.amenity_id = 1;
    reservationDTO.user_id = 'not an integer' as any;
    reservationDTO.start_time = 600;
    reservationDTO.end_time = 720;
    reservationDTO.date = '1644240000000';

    const errors = await validate(plainToClass(ReservationDTO, reservationDTO));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid if start_time is less than 0', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.id = 1;
    reservationDTO.amenity_id = 1;
    reservationDTO.user_id = 1;
    reservationDTO.start_time = -1;
    reservationDTO.end_time = 720;
    reservationDTO.date = '1644240000000';

    const errors = await validate(plainToClass(ReservationDTO, reservationDTO));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid if end_time is greater than 1440', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.id = 1;
    reservationDTO.amenity_id = 1;
    reservationDTO.user_id = 1;
    reservationDTO.start_time = 600;
    reservationDTO.end_time = 1441;
    reservationDTO.date = '1644240000000';

    const errors = await validate(plainToClass(ReservationDTO, reservationDTO));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid if date is not a valid timestamp', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.id = 1;
    reservationDTO.amenity_id = 1;
    reservationDTO.user_id = 1;
    reservationDTO.start_time = 600;
    reservationDTO.end_time = 720;
    reservationDTO.date = 'invalid timestamp';

    const errors = await validate(plainToClass(ReservationDTO, reservationDTO));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid if date is not a valid timestamp', async () => {
    const invalidTimestamps = [
      'invalid',
      '2022-02-08',
      new Date().toISOString(),
    ]; // Invalid timestamps
    await Promise.all(
      invalidTimestamps.map(async (timestamp) => {
        const reservationDTO = new ReservationDTO();
        reservationDTO.id = 1;
        reservationDTO.amenity_id = 1;
        reservationDTO.user_id = 1;
        reservationDTO.start_time = 600;
        reservationDTO.end_time = 720;
        reservationDTO.date = timestamp;

        const errors = await validate(
          plainToClass(ReservationDTO, reservationDTO),
        );
        expect(errors.length).toBeGreaterThan(0);
      }),
    );
  });

  it('should be valid if date is a valid timestamp', async () => {
    const validTimestamp = '1644240000000'; // Valid timestamp for '2022-02-08'
    const reservationDTO = new ReservationDTO();
    reservationDTO.id = 1;
    reservationDTO.amenity_id = 1;
    reservationDTO.user_id = 1;
    reservationDTO.start_time = 600;
    reservationDTO.end_time = 720;
    reservationDTO.date = validTimestamp;

    const errors = await validate(plainToClass(ReservationDTO, reservationDTO));
    expect(errors.length).toBe(0);
  });
});
