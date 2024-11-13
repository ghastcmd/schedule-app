import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './database/schedule.entity';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity])],
  providers: [SchedulesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
