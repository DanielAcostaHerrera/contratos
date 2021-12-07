import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtapasContratacionService } from 'src/etapas-contratacion/etapas-contratacion.service';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';
import { TiemposTravesia } from 'src/models/entities/TiemposTravesia.entity';
import { Repository } from 'typeorm';
import { CreateTiemposTravesiaInput } from './dto/create-tiempos-travesia.input';

@Injectable()
export class TiemposTravesiaService {
  constructor(@InjectRepository(TiemposTravesia) public readonly tiemposTravesiaRepository: Repository<TiemposTravesia>, private etapasContratacionService: EtapasContratacionService) {}


  async save(createTiemposTravesiaInput: CreateTiemposTravesiaInput) : Promise<TiemposTravesia> {
    return await this.tiemposTravesiaRepository.save(createTiemposTravesiaInput);
  }

  async findAll(): Promise<TiemposTravesia[]> { 
    return await this.tiemposTravesiaRepository.find();
  }

  async findOne(id: number) : Promise<TiemposTravesia> {
    return await this.tiemposTravesiaRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.tiemposTravesiaRepository.delete(id);
  }

  async getEtapasContratacion (etapaId: number) : Promise<EtapasContratacion>{
    return this.etapasContratacionService.findOne(etapaId);
  }
}
