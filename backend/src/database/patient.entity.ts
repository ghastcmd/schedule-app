import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('patient')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  followup: string;

  @Column()
  schedule: Schedule;
}
