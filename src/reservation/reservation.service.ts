import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as lodash from 'lodash';

import { Amenity } from '../amenity/entities/amenity.entity';
import { CsvService } from '../csv/csv.service';
import { User } from '../user/entities/user.entity';
import { ReservationImportDTO } from './dtos/reservation-import.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly cvsService: CsvService,
    private readonly reservationRepository: ReservationRepository,
  ) {}

  private async validateImportData(
    data: Reservation[],
  ): Promise<Reservation[]> {
    const reservations = plainToInstance(ReservationImportDTO, { data });
    await validate(reservations);
    return instanceToInstance(reservations).data.map((reservation) => {
      const amenity = new Amenity();
      amenity.id = reservation.amenity_id;
      const user = new User();
      user.id = reservation.user_id;
      return {
        ...reservation,
        amenity,
        user,
        duration: 0,
      };
    });
  }

  async importReservations(buffer: Buffer) {
    const result = await this.cvsService.parseCsv<Reservation>(buffer);
    const data = await this.validateImportData(result);
    try {
      await this.reservationRepository.updateMany(data);
      return data;
    } catch {
      throw new HttpException(
        'Failed to import reservations from CSV',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getBookingsForUser(userId: number) {
    const results = await this.reservationRepository.find({
      relations: {
        amenity: true,
      },
      order: {
        date: 'DESC',
      },
      where: {
        user: {
          id: userId,
        },
      },
    });
    return lodash.groupBy(results, 'date');
  }

  async getBookingsForAmenity(amenityId: number, timestamp: string) {
    try {
      const result = await this.reservationRepository.find({
        relations: {
          amenity: true,
        },
        order: {
          start_time: 'ASC',
        },
        where: {
          amenity: {
            id: amenityId,
          },
          date: timestamp,
        },
      });
      return result;
    } catch {
      return [];
    }
  }
}
