import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Especificos } from 'src/modelsMercurio/entities/Especificos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspecificosService {
  constructor(@InjectRepository(Especificos) public readonly especificosRepository: Repository<Especificos>) {}

  async findAll(): Promise<Especificos[]> {
    return await this.especificosRepository.find({relations: ['pliegoConcurrenciaDetalles']});
  }

  async findOne(id: number) : Promise<Especificos> {
    return await this.especificosRepository.findOne(id,{relations: ['pliegoConcurrenciaDetalles']});
  }
}