import { ArrayMaxSize, ArrayMinSize, ValidateNested } from 'class-validator';

import { AmenityDTO } from './amenity.dto';

export class AmenityImportDTO {
  @ValidateNested()
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
    data: AmenityDTO[];
}
