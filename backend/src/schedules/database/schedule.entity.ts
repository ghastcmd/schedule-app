import { PatientEntity } from 'src/patients/database/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.schedules)
  patient: PatientEntity[];
}
