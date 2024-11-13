import { Schedule } from './schedule.entity';

export interface Patient {
  id: number;
  name: string;
  phone: string;
  followup: string;
  schedule: Schedule;
}
