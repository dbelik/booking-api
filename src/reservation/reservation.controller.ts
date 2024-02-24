import {
  Controller, Get, Param, Post, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import config from '../config/config';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('users/:userId')
  async getBookingsForUser(@Param('userId') userId: number) {
    return this.reservationService.getBookingsForUser(userId);
  }

  @Get('amenities/:id/:timestamp')
  async getBookingsForAmenity(
  @Param('amenityId') amenityId: number,
    @Param('timestamp') timestamp: string,
  ) {
    return this.reservationService.getBookingsForAmenity(amenityId, timestamp);
  }

  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: config().import.maxFileSize,
      },
    }),
  )
  async importReservations(
  @UploadedFile() file: Express.Multer.File,
  ) {
    return this.reservationService.importReservations(file.buffer);
  }
}
