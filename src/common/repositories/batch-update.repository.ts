import { Injectable } from '@nestjs/common';
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export abstract class BatchUpdateRepository<T> extends Repository<T> {
  public async updateMany(
    data: T[],
    entity: EntityTarget<ObjectLiteral>,
    overwrite: string[],
    conflictTarget: string[],
  ) {
    return this
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(data)
      .orUpdate(
        overwrite,
        conflictTarget,
        {
          skipUpdateIfNoValuesChanged: true,
        },
      )
      .execute();
  }
}
