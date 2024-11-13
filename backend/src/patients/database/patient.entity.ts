import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { ScheduleEntity } from '../../schedules/database/schedule.entity';

@Entity('patient')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  followup: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.patient)
  schedules: ScheduleEntity[];
}
