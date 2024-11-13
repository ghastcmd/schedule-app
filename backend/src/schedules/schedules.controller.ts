import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleEntity } from './database/schedule.entity';
import { SchedulesService } from './schedules.service';
import { Schedule } from './interfaces/schedule.interface';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  async index(): Promise<ScheduleEntity[]> {
    return await this.schedulesService.findAll();
  }

  @Post()
  async create(@Body() schedule: Schedule): Promise<ScheduleEntity> {
    return await this.schedulesService.create(schedule);
  }
}
