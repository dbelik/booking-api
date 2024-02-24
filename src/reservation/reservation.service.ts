import { Injectable } from '@nestjs/common';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { CsvService } from '../csv/csv.service';
import { ReservationImportDTO } from './dtos/reservation-import.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly cvsService: CsvService,
    private readonly reservationRepository: ReservationRepository,
  ) {}

  private async validateImportData(data: Reservation[]): Promise<Reservation[]> {
    const reservations = plainToInstance(ReservationImportDTO, { data });
    await validate(reservations);
    return instanceToInstance(reservations).data;
  }

  async importReservations(
    buffer: Buffer,
  ) {
    const result = await this.cvsService.parseCsv<Reservation>(buffer);
    const data = await this.validateImportData(result.data);
    try {
      await this.reservationRepository.updateMany(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to import some entries. Error message: ${error.message}`);
      }
    }
  }

  async getBookingsForUser(userId: number) {
    throw new Error(`Not implemented yet. Input: ${userId}`);
  }

  async getBookingsForAmenity(amenityId: number, timestamp: string) {
    throw new Error(`Not implemented yet. Input: ${amenityId} ${timestamp}`);
  }
}
