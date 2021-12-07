import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosEntidad } from 'src/models/entities/DatosEntidad.entity';
import { Repository } from 'typeorm';
import { CreateDatosEntidadInput } from './dto/create-datos-entidad.input';

@Injectable()
export class DatosEntidadService {
  constructor(@InjectRepository(DatosEntidad) public readonly datosEntidadRepository: Repository<DatosEntidad>) {}


  async save(createDatosEntidadInput: CreateDatosEntidadInput) : Promise<DatosEntidad> {
    return await this.datosEntidadRepository.save(createDatosEntidadInput);
  }

  async findAll(): Promise<DatosEntidad[]> {
    return await this.datosEntidadRepository.find();
  }

  async findOne(id: number) : Promise<DatosEntidad> {
    return await this.datosEntidadRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.datosEntidadRepository.delete(id);
  }
}
