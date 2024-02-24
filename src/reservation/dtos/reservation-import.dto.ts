import { ValidateNested } from 'class-validator';

import { ReservationDTO } from './reservation.dto';

export class ReservationImportDTO {
  @ValidateNested()
    data: ReservationDTO[];
}
