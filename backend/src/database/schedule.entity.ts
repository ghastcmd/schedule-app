import { Entity } from 'typeorm';

@Entity(Schedule)
export class Schedule {
  date: string;
  time: string;
  notes: string;
}
