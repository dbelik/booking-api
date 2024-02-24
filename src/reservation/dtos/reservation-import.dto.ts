import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { ReservationDTO } from './reservation.dto';

export class ReservationImportDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReservationDTO)
    data: ReservationDTO[];
}
