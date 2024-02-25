import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { HttpResponseFormat } from '../common/filters/http-response-format.filter';
import config from '../config/config';
import { AmenityService } from './amenity.service';

@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Post('import')
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: config().import.maxFileSize,
      },
    }),
  )
  @UseInterceptors(HttpResponseFormat)
  async importAmenities(@UploadedFile() file: Express.Multer.File) {
    return this.amenityService.importAmenities(file.buffer);
  }
}
