import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmbalajeInput } from './dto/create-embalaje.input';
import { Embalajes } from '../models/entities/Embalajes.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class EmbalajesService {
  constructor(@InjectRepository(Embalajes) public readonly embalajesRepository: Repository<Embalajes>) {}


  async save(createEmbalajeInput: CreateEmbalajeInput) : Promise<Embalajes> {
    return await this.embalajesRepository.save(createEmbalajeInput);
  }

  async findAll(): Promise<Embalajes[]> {
    return await this.embalajesRepository.find();
  }

  async findOne(id: number) : Promise<Embalajes> {
    return await this.embalajesRepository.findOne({where: {idEmbalaje: id}});
  }

  async remove(id: number) : Promise<any> {
    const embalajes = await this.findOne(id);
    return await this.embalajesRepository.remove(embalajes);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const embalajes = await this.embalajesRepository.findBy({
      idEmbalaje: In(id)
  });
    return await this.embalajesRepository.remove(embalajes);
  }
}
