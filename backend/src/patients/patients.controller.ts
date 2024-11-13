import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientEntity } from 'src/patients/database/patient.entity';
import { Patient } from './interfaces/patient.interface';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async index(): Promise<PatientEntity[]> {
    return await this.patientsService.findAll();
  }

  @Post()
  async create(@Body() patient: Patient): Promise<Patient> {
    return await this.patientsService.create(patient);
  }

  @Patch(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() patient: Patient,
  ): Promise<PatientEntity> {
    return await this.patientsService.update(+id, patient);
  }
}
