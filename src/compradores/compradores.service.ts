import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { Repository } from 'typeorm';
import { CreateCompradoresInput } from './dto/create-compradores.input';

@Injectable()
export class CompradoresService {
  constructor(@InjectRepository(Compradores) public readonly compradoresRepository: Repository<Compradores>) {}


  async save(createCompradoresInput: CreateCompradoresInput) : Promise<Compradores> {
    return await this.compradoresRepository.save(createCompradoresInput);
  }

  async findAll(): Promise<Compradores[]> {
    return await this.compradoresRepository.find({ relations: ['basesCMarcos','basesGenerales','solicitudContratacion']});
  }

  async findOne(id: number) : Promise<Compradores> {
    return await this.compradoresRepository.findOne(id, { relations: ['basesCMarcos','basesGenerales','solicitudContratacion']});
  }

  async remove(id: number) : Promise<any> {
    return await this.compradoresRepository.delete(id);
  }
}
  