import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CsvModule } from '../csv/csv.module';
import { AmenityController } from './amenity.controller';
import { AmenityRepository } from './amenity.repository';
import { AmenityService } from './amenity.service';
import { Amenity } from './entities/amenity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Amenity]),
    CsvModule,
  ],
  controllers: [AmenityController],
  providers: [AmenityRepository, AmenityService],
})
export class AmenityModule {}
