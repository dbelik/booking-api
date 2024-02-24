import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Amenity } from './entities/amenity.entity';

@Injectable()
export class AmenityRepository extends Repository<Amenity> {
  constructor(
  @InjectRepository(Amenity)
    repository: Repository<Amenity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async updateMany(
    data: Amenity[],
  ) {
    return this
      .createQueryBuilder()
      .insert()
      .into(Amenity)
      .values(data)
      .orUpdate(
        ['name'],
        ['name'],
        {
          skipUpdateIfNoValuesChanged: true,
        },
      )
      .execute();
  }
}
