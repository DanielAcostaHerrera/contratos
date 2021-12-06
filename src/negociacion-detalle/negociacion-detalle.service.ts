import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionDetalle } from 'src/models/entities/NegociacionDetalle.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { Repository } from 'typeorm';
import { CreateNegociacionDetalleInput } from './dto/create-negociacion-detalle.input';

@Injectable()
export class NegociacionDetalleService {
  constructor(@InjectRepository(NegociacionDetalle) public readonly negociacionDetalleRepository: Repository<NegociacionDetalle>,
  private negociacionResumenService: NegociacionResumenService) {}


  async save(createNegociacionDetalleInput: CreateNegociacionDetalleInput) : Promise<NegociacionDetalle> {
    return await this.negociacionDetalleRepository.save(createNegociacionDetalleInput);
  }

  async findAll(): Promise<NegociacionDetalle[]> {
    return await this.negociacionDetalleRepository.find();
  }

  async findOne(id: number) : Promise<NegociacionDetalle> {
    return await this.negociacionDetalleRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.negociacionDetalleRepository.delete(id);
  }

  async getNegociacionResumen (negociacionResumenId: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(negociacionResumenId);
  }
}