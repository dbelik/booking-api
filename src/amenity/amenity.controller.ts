import {
  Controller, Post, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import config from '../config/config';
import { AmenityService } from './amenity.service';

@Controller('amenities')
export class AmenityController {
  constructor(
    private readonly amenityService: AmenityService,
  ) {}

  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: config().import.maxFileSize,
      },
    }),
  )
  async importAmenities(
  @UploadedFile() file: Express.Multer.File,
  ) {
    await this.amenityService.importAmenities(file.buffer);
  }
}
