import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BatchUpdateRepository } from '../common/repositories/batch-update.repository';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationRepository extends BatchUpdateRepository<Reservation> {
  constructor(
  @InjectRepository(Reservation)
    repository: Repository<Reservation>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async updateMany(data: Reservation[]) {
    return super.updateMany(
      data,
      Reservation,
      ['amenity_id', 'user_id', 'start_time', 'end_time', 'date'],
      ['id'],
    );
  }
}
