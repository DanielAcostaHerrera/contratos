import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuracion } from 'src/models/entities/Configuracion.entity';
import { Repository } from 'typeorm';
import { CreateConfiguracionInput } from './dto/create-configuracion.input';

@Injectable()
export class ConfiguracionService {
  constructor(@InjectRepository(Configuracion) public readonly configuracionRepository: Repository<Configuracion>) {}


  async save(createConfiguracionInput: CreateConfiguracionInput) : Promise<Configuracion> {
    return await this.configuracionRepository.save(createConfiguracionInput);
  }

  async findAll(): Promise<Configuracion[]> {
    return await this.configuracionRepository.find();
  }

  async findOne(id: number) : Promise<Configuracion> {
    return await this.configuracionRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.configuracionRepository.delete(id);
  }
}
