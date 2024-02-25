import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config/config';
import { CsvModule } from '../csv/csv.module';
import { AmenityController } from './amenity.controller';
import { AmenityRepository } from './amenity.repository';
import { AmenityService } from './amenity.service';
import { Amenity } from './entities/amenity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Amenity]),
    CsvModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: config().auth.cookie.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AmenityController],
  providers: [AmenityRepository, AmenityService],
})
export class AmenityModule {}
