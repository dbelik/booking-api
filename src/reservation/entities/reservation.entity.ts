import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    amenityId: number;

  @Column()
    userId: number;

  @Column()
    startTime: number;

  @Column()
    endTime: number;

  @Column()
    date: number;
}
