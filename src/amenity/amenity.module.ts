import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';
import { Amenity } from './entities/amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
  controllers: [AmenityController],
  providers: [AmenityService],
})
export class AmenityModule {}
