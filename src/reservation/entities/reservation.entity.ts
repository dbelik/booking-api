import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Amenity } from '../../amenity/entities/amenity.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Amenity)
  @JoinColumn({ name: 'amenity_id' })
    amenity: Amenity;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
    user: User;

  @Column()
  @Transform(
    ({ value }) => `${Math.floor(value / 60) >= 10 ? '' : '0'}${Math.floor(value / 60)}:${value % 60 >= 10 ? '' : '0'}${value % 60}`,
  )
    start_time: number;

  @Column()
  @Exclude()
    end_time: number;

  @Column()
  @Exclude()
    date: string;

  @Expose()
  get duration(): number {
    return this.end_time - this.start_time;
  }
}
