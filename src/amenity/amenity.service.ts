import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { CsvService } from '../csv/csv.service';
import { AmenityRepository } from './amenity.repository';
import { AmenityImportDTO } from './dtos/amenity-import.dto';
import { Amenity } from './entities/amenity.entity';

@Injectable()
export class AmenityService {
  constructor(
    private readonly amenityRepository: AmenityRepository,
    private readonly cvsService: CsvService,
  ) {}

  private async validateImportData(data: Amenity[]): Promise<Amenity[]> {
    const amenities = plainToInstance(AmenityImportDTO, { data });
    await validate(amenities);
    return instanceToInstance(amenities).data;
  }

  async importAmenities(buffer: Buffer) {
    const result = await this.cvsService.parseCsv<Amenity>(buffer);
    const data = await this.validateImportData(result);
    try {
      await this.amenityRepository.updateMany(data);
      return data;
    } catch {
      throw new HttpException(
        'Failed to import amenities from CSV',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
