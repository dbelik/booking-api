import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async getBookingsForUser(userId: number) {
    throw new Error(`Not implemented yet. Input: ${userId}`);
  }

  async getBookingsForAmenity(amenityId: number, timestamp: string) {
    throw new Error(`Not implemented yet. Input: ${amenityId} ${timestamp}`);
  }
}
