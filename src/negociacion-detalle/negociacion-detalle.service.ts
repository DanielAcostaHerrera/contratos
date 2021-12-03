import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionDetalle } from 'src/models/entities/NegociacionDetalle.entity';
import { Repository } from 'typeorm';
import { CreateNegociacionDetalleInput } from './dto/create-negociacion-detalle.input';

@Injectable()
export class NegociacionDetalleService {
  constructor(@InjectRepository(NegociacionDetalle) public readonly negociacionDetalleRepository: Repository<NegociacionDetalle>) {}


  async save(createNegociacionDetalleInput: CreateNegociacionDetalleInput) : Promise<NegociacionDetalle> {
    return await this.negociacionDetalleRepository.save(createNegociacionDetalleInput);
  }

  async findAll(): Promise<NegociacionDetalle[]> {
    return await this.negociacionDetalleRepository.find({ relations: ['negociacionResumen']});
  }

  async findOne(id: number) : Promise<NegociacionDetalle> {
    return await this.negociacionDetalleRepository.findOne(id,{ relations: ['negociacionResumen']});
  }

  async remove(id: number) : Promise<any> {
    return await this.negociacionDetalleRepository.delete(id);
  }
}