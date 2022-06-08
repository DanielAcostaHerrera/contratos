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
    return await this.datosEntidadRepository.find({relations: ['configuracion','compradores']});
  }

  async findOne(id: number) : Promise<DatosEntidad> {
    return await this.datosEntidadRepository.findOne(id,{relations: ['configuracion','compradores']});
  }

  async remove(id: number) : Promise<any> {
    const datosEntidad = await this.findOne(id);
    return await this.datosEntidadRepository.remove(datosEntidad);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const datosEntidad = await this.datosEntidadRepository.findByIds(id);
    return await this.datosEntidadRepository.remove(datosEntidad);
  }
}
