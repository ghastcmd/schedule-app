import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from './database/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './interfaces/schedule.interface';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async findAll(): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find();
  }

  async create(schedule: Schedule): Promise<ScheduleEntity> {
    return await this.scheduleRepository.save(schedule);
  }
}
