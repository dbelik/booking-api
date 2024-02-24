import { Transform } from 'class-transformer';
import {
  IsInt, Max, Min, Validate,
} from 'class-validator';

import { IsValidTimestamp } from '../../common/validators/is-valid-timestamp.validator';

export class ReservationDTO {
  @IsInt()
    id: number;

  @IsInt()
    amenity_id: number;

  @IsInt()
    user_id: number;

  @IsInt()
  @Min(0)
  @Max(1440)
    start_time: number;

  @IsInt()
  @Min(0)
  @Max(1440)
    end_time: number;

  @Validate(IsValidTimestamp)
  @Transform(({ value }) => {
    const date = new Date(Number.parseInt(value as string, 10));
    date.setHours(0, 0, 0, 0);
    return date.getTime().toString();
  })
    date: string;
}
