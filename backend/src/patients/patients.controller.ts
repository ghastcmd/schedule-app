import { Controller, Get } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientEntity } from 'src/patients/database/patient.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async index(): Promise<PatientEntity[]> {
    return await this.patientsService.findAll();
  }
}
