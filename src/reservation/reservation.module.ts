import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config/config';
import { CsvModule } from '../csv/csv.module';
import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    CsvModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: config().auth.cookie.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ReservationController],
  providers: [ReservationRepository, ReservationService],
})
export class ReservationModule {}
