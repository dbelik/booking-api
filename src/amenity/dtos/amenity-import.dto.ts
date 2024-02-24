import { ValidateNested } from 'class-validator';

import { AmenityDTO } from './amenity.dto';

export class AmenityImportDTO {
  @ValidateNested()
    data: AmenityDTO[];
}
