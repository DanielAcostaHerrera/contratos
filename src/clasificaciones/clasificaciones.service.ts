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
    return await this.clasificacionesRepository.find();
  }

  async findOne(id: number) : Promise<Clasificaciones> {
    return await this.clasificacionesRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const clasificaciones = await this.findOne(id);
    return await this.clasificacionesRepository.remove(clasificaciones);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const clasificaciones = await this.clasificacionesRepository.findByIds(id);
    return await this.clasificacionesRepository.remove(clasificaciones);
  }
}
