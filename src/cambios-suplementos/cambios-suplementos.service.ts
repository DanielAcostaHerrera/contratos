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
    return await this.cambiosSuplementosRepository.find({relations: ['suplementoChanges']});
  }

  async findOne(id: number) : Promise<CambiosSuplementos> {
    return await this.cambiosSuplementosRepository.findOne(id,{relations: ['suplementoChanges']});
  }

  async remove(id: number) : Promise<any> {
    const cambiosSuplementos = await this.findOne(id);
    return await this.cambiosSuplementosRepository.remove(cambiosSuplementos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const cambiosSuplementos = await this.cambiosSuplementosRepository.findByIds(id);
    return await this.cambiosSuplementosRepository.remove(cambiosSuplementos);
  }
}
