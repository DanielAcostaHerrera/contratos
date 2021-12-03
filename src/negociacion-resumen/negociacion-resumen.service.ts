import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Repository } from 'typeorm';
import { CreateNegociacionResumenInput } from './dto/create-negociacion-resumen.input';

@Injectable()
export class NegociacionResumenService {
  constructor(@InjectRepository(NegociacionResumen) public readonly negociacionResumenRepository: Repository<NegociacionResumen>) {}


  async save(createNegociacionResumenInput: CreateNegociacionResumenInput) : Promise<NegociacionResumen> {
    return await this.negociacionResumenRepository.save(createNegociacionResumenInput);
  }

  async findAll(): Promise<NegociacionResumen[]> {
    return await this.negociacionResumenRepository.find({ relations: ['negociacionDetalle','negociacionDetalles','negociacionProveedores','tiposDeCompras','monedas','grupos']});
  }

  async findOne(id: number) : Promise<NegociacionResumen> {
    return await this.negociacionResumenRepository.findOne(id,{ relations: ['negociacionDetalle','negociacionDetalles','negociacionProveedores','tiposDeCompras','monedas','grupos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.negociacionResumenRepository.delete(id);
  }
}
