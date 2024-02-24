import {
  IsInt, IsString, MaxLength, MinLength,
} from 'class-validator';

export class AmenityDTO {
  @IsInt()
    id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
    name: string;
}
