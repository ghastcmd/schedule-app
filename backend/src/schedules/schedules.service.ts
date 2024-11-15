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

  async findDay(day: string): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find({
      where: { date: day },
      relations: ['patient'],
    });
  }

  async findWeek(date: string): Promise<ScheduleEntity[][]> {
    const retArray = [];

    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - currentDate.getDay());
    for (let i = 0; i < 7; i++) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      const retData = await this.findDay(formattedDate);
      retArray.push(retData);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return retArray;
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
