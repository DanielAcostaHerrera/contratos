import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposContenedor } from 'src/models/entities/TiposContenedor.entity';
import { Repository } from 'typeorm';
import { CreateTiposContenedorInput } from './dto/create-tipos-contenedor.input';

@Injectable()
export class TiposContenedorService {
  constructor(@InjectRepository(TiposContenedor) public readonly tiposContenedorRepository: Repository<TiposContenedor>) {}


  async save(createTiposContenedorInput: CreateTiposContenedorInput) : Promise<TiposContenedor> {
    return await this.tiposContenedorRepository.save(createTiposContenedorInput);
  }

  async findAll(): Promise<TiposContenedor[]> {
    return await this.tiposContenedorRepository.find({relations:['pliegoConcurrenciaResumen']});
  }

  async findOne(id: number) : Promise<TiposContenedor> {
    return await this.tiposContenedorRepository.findOne(id,{relations:['pliegoConcurrenciaResumen']});
  }

  async remove(id: number) : Promise<any> {
    return await this.tiposContenedorRepository.delete(id);
  }
}
