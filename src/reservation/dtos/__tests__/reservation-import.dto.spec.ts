import { validate } from 'class-validator';

import { ReservationDTO } from '../reservation.dto';
import { ReservationImportDTO } from '../reservation-import.dto';

describe('ReservationImportDTO', () => {
  let reservationImportDTO: ReservationImportDTO;

  beforeEach(() => {
    reservationImportDTO = new ReservationImportDTO();
  });

  it('should validate each nested ReservationDTO object', async () => {
    const reservationDTO1 = new ReservationDTO();
    reservationDTO1.id = 1;
    reservationDTO1.amenity_id = 1;
    reservationDTO1.user_id = 1;
    reservationDTO1.start_time = 0;
    reservationDTO1.end_time = 60;
    reservationDTO1.date = '1644240000000'; // Valid timestamp for '2022-02-08'

    const reservationDTO2 = new ReservationDTO();
    reservationDTO2.id = 2;
    reservationDTO2.amenity_id = 2;
    reservationDTO2.user_id = 2;
    reservationDTO2.start_time = 0;
    reservationDTO2.end_time = 60;
    reservationDTO2.date = '1644240000000'; // Valid timestamp for '2022-02-08'

    reservationImportDTO.data = [reservationDTO1, reservationDTO2];

    const errors = await validate(reservationImportDTO);
    expect(errors.length).toBe(0);
  });

  it('should fail if any nested ReservationDTO object fails validation', async () => {
    const invalidReservationDTO = new ReservationDTO();
    invalidReservationDTO.id = 'not a number' as any; // Invalid id
    invalidReservationDTO.amenity_id = 'not a number' as any; // Invalid amenity_id
    invalidReservationDTO.user_id = 'not a number' as any; // Invalid user_id
    invalidReservationDTO.start_time = -1; // Invalid start_time
    invalidReservationDTO.end_time = 1441; // Invalid end_time
    invalidReservationDTO.date = 'invalid'; // Invalid date

    reservationImportDTO.data = [invalidReservationDTO];
    const errors = await validate(reservationImportDTO);
    expect(errors).toBeDefined();
    expect(errors.length).toBeGreaterThan(0);
  });
});
