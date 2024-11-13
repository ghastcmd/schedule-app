import { Schedule } from './schedule.interface';

export interface PatientEntity {
  id: number;
  name: string;
  phone: string;
  followup: string;
  schedule: Schedule;
}
