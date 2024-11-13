import { Entity } from 'typeorm';

@Entity('schedule')
export class Schedule {
  date: string;
  time: string;
  notes: string;
}
