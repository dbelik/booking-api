import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CsvModule } from '../csv/csv.module';
import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    CsvModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationRepository, ReservationService],
})
export class ReservationModule {}
