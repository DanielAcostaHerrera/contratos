import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmbalajeInput } from './dto/create-embalaje.input';
import { Embalajes } from '../models/entities/Embalajes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmbalajesService {
  constructor(@InjectRepository(Embalajes) public readonly embalajesRepository: Repository<Embalajes>) {}


  async save(createMonedaInput: CreateEmbalajeInput) : Promise<Embalajes> {
    return await this.embalajesRepository.save(createMonedaInput);
  }

  async findAll(): Promise<Embalajes[]> {
    return await this.embalajesRepository.find({relations:['pliegoConcurrenciaDetalles','solicitudCodificacion']});
  }

  async findOne(id: number) : Promise<Embalajes> {
    return await this.embalajesRepository.findOne({where: {idEmbalaje: id},relations:['pliegoConcurrenciaDetalles','solicitudCodificacion']});
  }

  async remove(id: number) : Promise<any> {
    const embalajes = await this.findOne(id);
    return await this.embalajesRepository.remove(embalajes);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const embalajes = await this.embalajesRepository.findByIds(id);
    return await this.embalajesRepository.remove(embalajes);
  }
}
