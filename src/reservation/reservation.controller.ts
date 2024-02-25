import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { HttpResponseFormat } from '../common/filters/http-response-format.filter';
import config from '../config/config';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('users/:userId')
  @ApiTags('reservation')
  @UseInterceptors(HttpResponseFormat)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returned a list of user's reservations",
  })
  async getBookingsForUser(@Param('userId') userId: number) {
    return this.reservationService.getBookingsForUser(userId);
  }

  @Get('amenities/:id/:timestamp')
  @ApiTags('reservation')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returned a list of amenity's reservations",
  })
  @UseInterceptors(HttpResponseFormat)
  async getBookingsForAmenity(
  @Param('amenityId') amenityId: number,
    @Param('timestamp') timestamp: string,
  ) {
    return this.reservationService.getBookingsForAmenity(amenityId, timestamp);
  }

  @Post('import')
  @UseGuards(JwtGuard)
  @ApiTags('reservation')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created reservations based on the data from CSV file',
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
  async importReservations(
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
    return this.reservationService.importReservations(file.buffer);
  }
}
