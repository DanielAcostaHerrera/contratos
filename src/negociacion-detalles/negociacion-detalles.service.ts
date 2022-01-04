import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionDetalles } from 'src/models/entities/NegociacionDetalles.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { Repository } from 'typeorm';
import { CreateNegociacionDetallesInput } from './dto/create-negociacion-detalles.input';

@Injectable()
export class NegociacionDetallesService {
  constructor(@InjectRepository(NegociacionDetalles) public readonly negociacionDetallesRepository: Repository<NegociacionDetalles>,
  private negociacionResumenService: NegociacionResumenService) {}


  async save(createNegociacionDetalleInput: CreateNegociacionDetallesInput) : Promise<NegociacionDetalles> {
    return await this.negociacionDetallesRepository.save(createNegociacionDetalleInput);
  }

  async findAll(): Promise<NegociacionDetalles[]> {
    return await this.negociacionDetallesRepository.find();
  }

  async findOne(id: number) : Promise<NegociacionDetalles> {
    return await this.negociacionDetallesRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const negociacionDetalles = await this.findOne(id);
    return await this.negociacionDetallesRepository.remove(negociacionDetalles);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const negociacionDetalles = await this.negociacionDetallesRepository.findByIds(id);
    return await this.negociacionDetallesRepository.remove(negociacionDetalles);
  }

  async getNegociacionResumen (negociacionResumenId: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(negociacionResumenId);
  }
  
}
