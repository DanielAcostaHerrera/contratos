import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CambiosSuplementos } from 'src/models/entities/CambiosSuplementos.entity';
import { Repository } from 'typeorm';
import { CreateCambiosSuplementoInput } from './dto/create-cambios-suplemento.input';

@Injectable()
export class CambiosSuplementosService {
  constructor(@InjectRepository(CambiosSuplementos) public readonly cambiosSuplementosRepository: Repository<CambiosSuplementos>) {}


  async save(createCambiosSuplementoInpuc: CreateCambiosSuplementoInput) : Promise<CambiosSuplementos> {
    return await this.cambiosSuplementosRepository.save(createCambiosSuplementoInpuc);
  }

  async findAll(): Promise<CambiosSuplementos[]> { 
    return await this.cambiosSuplementosRepository.find();
  }

  async findOne(id: number) : Promise<CambiosSuplementos> {
    return await this.cambiosSuplementosRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.cambiosSuplementosRepository.delete(id);
  }
}
