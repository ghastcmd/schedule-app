import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() schedule: Schedule,
  ): Promise<ScheduleEntity> {
    const id_conv: number = +id;
    return await this.schedulesService.updateSchedule(id_conv, schedule);
  }

  @Post()
  async create(@Body() schedule: Schedule): Promise<ScheduleEntity> {
    return await this.schedulesService.create(schedule);
  }
}
