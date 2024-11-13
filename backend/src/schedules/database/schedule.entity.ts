import { PatientEntity } from 'src/patients/database/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  notes: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.schedules)
  patients: PatientEntity[];
}