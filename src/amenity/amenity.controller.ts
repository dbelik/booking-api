import { Controller } from '@nestjs/common';

import { AmenityService } from './amenity.service';

@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}
}
