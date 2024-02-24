import { Transform } from 'class-transformer';
import {
  IsInt, IsNumberString, Max, Min,
} from 'class-validator';

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

  @IsNumberString()
  @Transform(({ value }) => {
    const date = new Date(Number.parseInt(value as string, 10));
    date.setHours(0, 0, 0, 0);
    return date.getTime().toString();
  })
    date: string;
}
