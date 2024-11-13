import { Schedule } from '../../schedules/interfaces/schedule.interface';

export interface Patient {
  id: number;
  name: string;
  phone: string;
  followup: string;
  schedules: Schedule[];
}
