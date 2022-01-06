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
    return await this.configuracionRepository.find({relations:['entidad']});
  }

  async findOne(id: number) : Promise<Configuracion> {
    return await this.configuracionRepository.findOne(id,{relations:['entidad']});
  }

  async remove(id: number) : Promise<any> {
    const configuracion = await this.findOne(id);
    return await this.configuracionRepository.remove(configuracion);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const configuracion = await this.configuracionRepository.findByIds(id);
    return await this.configuracionRepository.remove(configuracion);
  }
}
