import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AmenityModule } from './amenity/amenity.module';
import configuration from './config/config';
import { DatabaseModule } from './database/database.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    AmenityModule,
    ReservationModule,
  ],
})
export class AppModule {}
