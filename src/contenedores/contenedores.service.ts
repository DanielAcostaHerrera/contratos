import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contenedores } from 'src/models/entities/Contenedores.entity';
import { Repository } from 'typeorm';
import { CreateContenedoreInput } from './dto/create-contenedore.input';

@Injectable()
export class ContenedoresService {
  constructor(@InjectRepository(Contenedores) public readonly contenedoresRepository: Repository<Contenedores>) {}


  async save(createContenedoreInput: CreateContenedoreInput) : Promise<Contenedores> {
    return await this.contenedoresRepository.save(createContenedoreInput);
  }

  async findAll(): Promise<Contenedores[]> {
    return await this.contenedoresRepository.find({relations:['facturaContenedores']});
  }

  async findOne(id: number) : Promise<Contenedores> {
    return await this.contenedoresRepository.findOne(id,{relations:['facturaContenedores']});
  }

  async remove(id: number) : Promise<any> {
    const contenedores = await this.findOne(id);
    return await this.contenedoresRepository.remove(contenedores);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const contenedores = await this.contenedoresRepository.findByIds(id);
    return await this.contenedoresRepository.remove(contenedores);
  }
}
