import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScheduleEntity } from './database/schedule.entity';
import { SchedulesService } from './schedules.service';
import { Schedule } from './interfaces/schedule.interface';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get('s/:id')
  async indexOne(@Param('id') id: string): Promise<ScheduleEntity[]> {
    return await this.schedulesService.findOne(id);
  }

  @Get('')
  async index(): Promise<ScheduleEntity[]> {
    return await this.schedulesService.findAll();
  }

  @Get(':id')
  async getSchedules(@Param('id') id: string): Promise<ScheduleEntity[]> {
    const id_conv: number = +id;
    return await this.schedulesService.findAllPatient(id_conv);
  }

  @Get('d/:day')
  async getWeek(@Param('day') day: string): Promise<ScheduleEntity[][]> {
    return await this.schedulesService.findWeek(day);
  }

  @Patch(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() schedule: Schedule,
  ): Promise<ScheduleEntity> {
    return await this.schedulesService.updateSchedule(+id, schedule);
  }

  @Delete(':id')
  async deleteSchedule(@Param('id') id: string): Promise<ScheduleEntity> {
    return await this.schedulesService.deleteSchedule(+id);
  }

  @Post()
  async create(@Body() schedule: Schedule): Promise<ScheduleEntity> {
    return await this.schedulesService.create(schedule);
  }
}
