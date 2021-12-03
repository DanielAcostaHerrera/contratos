import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionDetalles } from 'src/models/entities/NegociacionDetalles.entity';
import { Repository } from 'typeorm';
import { CreateNegociacionDetallesInput } from './dto/create-negociacion-detalles.input';

@Injectable()
export class NegociacionDetallesService {
  constructor(@InjectRepository(NegociacionDetalles) public readonly negociacionDetallesRepository: Repository<NegociacionDetalles>) {}


  async save(createNegociacionDetalleInput: CreateNegociacionDetallesInput) : Promise<NegociacionDetalles> {
    return await this.negociacionDetallesRepository.save(createNegociacionDetalleInput);
  }

  async findAll(): Promise<NegociacionDetalles[]> {
    return await this.negociacionDetallesRepository.find({ relations: ['negociacionResumen']});
  }

  async findOne(id: number) : Promise<NegociacionDetalles> {
    return await this.negociacionDetallesRepository.findOne(id,{ relations: ['negociacionResumen']});
  }

  async remove(id: number) : Promise<any> {
    return await this.negociacionDetallesRepository.delete(id);
  }
}
