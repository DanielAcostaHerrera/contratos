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
    return await this.etapasContratacionRepository.find({relations:['campanaEtapasContratacion','tiemposTravesias']});
  }

  async findOne(id: number) : Promise<EtapasContratacion> {
    return await this.etapasContratacionRepository.findOne(id,{relations:['campanaEtapasContratacion','tiemposTravesias']});
  }

  async remove(id: number) : Promise<any> {
    return await this.etapasContratacionRepository.delete(id);
  }
}
