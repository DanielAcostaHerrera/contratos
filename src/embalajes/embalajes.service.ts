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
    return await this.embalajesRepository.find({relations:['fichaCostoResumen', 'pliegoConcurrenciaDetalles']});
  }

  async findOne(id: number) : Promise<Embalajes> {
    return await this.embalajesRepository.findOne(id,{relations:['fichaCostoResumen','pliegoConcurrenciaDetalles']});
  }

  async remove(id: number) : Promise<any> {
    return await this.embalajesRepository.delete(id);
  }
}
