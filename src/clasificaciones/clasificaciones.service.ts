import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clasificaciones } from 'src/models/entities/Clasificaciones.entity';
import { Repository } from 'typeorm';
import { CreateClasificacioneInput } from './dto/create-clasificacione.input';

@Injectable()
export class ClasificacionesService {
  constructor(@InjectRepository(Clasificaciones) public readonly clasificacionesRepository: Repository<Clasificaciones>) {}


  async save(createClasificacioneInput: CreateClasificacioneInput) : Promise<Clasificaciones> {
    return await this.clasificacionesRepository.save(createClasificacioneInput);
  }

  async findAll(): Promise<Clasificaciones[]> {
    return await this.clasificacionesRepository.find({ relations: ['basesGenerales']});
  }

  async findOne(id: number) : Promise<Clasificaciones> {
    return await this.clasificacionesRepository.findOne(id, { relations: ['basesGenerales']});
  }

  async remove(id: number) : Promise<any> {
    return await this.clasificacionesRepository.delete(id);
  }
}
