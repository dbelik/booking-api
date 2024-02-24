import {
  IsDateString, IsInt, Max, Min,
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

  @IsDateString()
    date: string;
}
