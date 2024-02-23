import { Controller, Get, Param } from '@nestjs/common';

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
}
