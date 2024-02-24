import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BatchUpdateRepository } from '../common/repositories/batch-update.repository';
import { Amenity } from './entities/amenity.entity';

@Injectable()
export class AmenityRepository extends BatchUpdateRepository<Amenity> {
  constructor(
  @InjectRepository(Amenity)
    repository: Repository<Amenity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async updateMany(data: Amenity[]) {
    return super.updateMany(data, Amenity, ['name'], ['id', 'name']);
  }
}
