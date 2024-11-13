import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ScheduleEntity } from './database/schedule.entity';
import { SchedulesService } from './schedules.service';
import { Schedule } from './interfaces/schedule.interface';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get('')
  async index(): Promise<ScheduleEntity[]> {
    return await this.schedulesService.findAll();
  }

  @Get(':id')
  async getSchedules(@Param('id') id: string): Promise<ScheduleEntity[]> {
    const id_conv: number = +id;
    return await this.schedulesService.findAllPatient(id_conv);
  }

  @Post()
  async create(@Body() schedule: Schedule): Promise<ScheduleEntity> {
    return await this.schedulesService.create(schedule);
  }
}
