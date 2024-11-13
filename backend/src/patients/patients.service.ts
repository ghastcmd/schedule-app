import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from 'src/patients/database/patient.entity';
import { Repository } from 'typeorm';
import { Patient } from './interfaces/patient.interface';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  async findAll(): Promise<PatientEntity[]> {
    return await this.patientRepository.find();
  }

  async create(patient: Patient): Promise<PatientEntity> {
    return await this.patientRepository.save(patient);
  }

  async update(id: number, patient: Patient): Promise<PatientEntity> {
    await this.patientRepository.update(id, patient);
    return await this.patientRepository.findOne({
      where: { id: id },
    });
  }

  async delete(id: number): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOne({
      where: { id: id },
    });
    await this.patientRepository.delete(id);
    return patient;
  }
}
