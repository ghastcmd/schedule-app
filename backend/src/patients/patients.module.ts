import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './database/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
