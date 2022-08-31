import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';
import { Repository } from 'typeorm';
import { CreateEtapasContratacionInput } from './dto/create-etapas-contratacion.input';

@Injectable()
export class EtapasContratacionService {
  constructor(@InjectRepository(EtapasContratacion) public readonly etapasContratacionRepository: Repository<EtapasContratacion>) {}


  async save(createEtapasContratacionInput: CreateEtapasContratacionInput) : Promise<EtapasContratacion> {
    return await this.etapasContratacionRepository.save(createEtapasContratacionInput);
  }

  async findAll(): Promise<EtapasContratacion[]> { 
    return await this.etapasContratacionRepository.find();
  }

  async findOne(id: number) : Promise<EtapasContratacion> {
    return await this.etapasContratacionRepository.findOne({where: {idEtapa: id},});
  }

  async remove(id: number) : Promise<any> {
    const etapasContratacion = await this.findOne(id);
    return await this.etapasContratacionRepository.remove(etapasContratacion);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const etapasContratacion = await this.etapasContratacionRepository.findByIds(id);
    return await this.etapasContratacionRepository.remove(etapasContratacion);
  }
}
