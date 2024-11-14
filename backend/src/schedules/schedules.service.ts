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

  async findOne(id: string): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find({
      where: { id: +id },
      relations: ['patient'],
    });
  }

  async findAllPatient(id: number): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find({
      where: { patient: { id: id } },
    });
  }

  async findAll(): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find({ relations: ['patient'] });
  }

  async updateSchedule(
    id: number,
    schedule: Schedule,
  ): Promise<ScheduleEntity> {
    await this.scheduleRepository.update(id, schedule);
    return await this.scheduleRepository.findOne({
      where: { id: schedule.id },
    });
  }

  async deleteSchedule(id: number): Promise<ScheduleEntity> {
    await this.scheduleRepository.delete(id);
    return this.scheduleRepository.findOne({ where: { id: id } });
  }

  async create(schedule: Schedule): Promise<ScheduleEntity> {
    return await this.scheduleRepository.save(schedule);
  }
}
