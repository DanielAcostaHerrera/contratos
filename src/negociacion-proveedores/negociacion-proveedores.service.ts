import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionProveedores } from 'src/models/entities/NegociacionProveedores.entity';
import { Repository } from 'typeorm';
import { CreateNegociacionProveedoresInput } from './dto/create-negociacion-proveedores.input';

@Injectable()
export class NegociacionProveedoresService {
  constructor(@InjectRepository(NegociacionProveedores) public readonly negociacionProveedoresRepository: Repository<NegociacionProveedores>) {}


  async save(createNegociacionProveedoresInput: CreateNegociacionProveedoresInput) : Promise<NegociacionProveedores> {
    return await this.negociacionProveedoresRepository.save(createNegociacionProveedoresInput);
  }

  async findAll(): Promise<NegociacionProveedores[]> {
    return await this.negociacionProveedoresRepository.find({ relations: ['negociacionResumen']});
  }

  async findOne(id: number) : Promise<NegociacionProveedores> {
    return await this.negociacionProveedoresRepository.findOne(id,{ relations: ['negociacionResumen']});
  }

  async remove(id: number) : Promise<any> {
    return await this.negociacionProveedoresRepository.delete(id);
  }
}