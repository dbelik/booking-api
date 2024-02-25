import {
  Controller,
  HttpException,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { HttpResponseFormat } from '../common/filters/http-response-format.filter';
import config from '../config/config';
import { AmenityService } from './amenity.service';

@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Post('import')
  @UseGuards(JwtGuard)
  @ApiTags('amenity')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created amenities based on the data from CSV file',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Failed to import CSV file',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCookieAuth(config().auth.cookie.name)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: config().import.maxFileSize,
      },
    }),
  )
  @UseInterceptors(HttpResponseFormat)
  async importAmenities(
  @UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'csv',
      })
      .build({
        exceptionFactory(error) {
          throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
        },
      }),
  )
    file: Express.Multer.File,
  ) {
    return this.amenityService.importAmenities(file.buffer);
  }
}
