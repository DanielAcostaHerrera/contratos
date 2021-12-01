import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Repository } from 'typeorm';
import { CreateEjecutivoInput } from './dto/create-ejecutivo.input';

@Injectable()
export class EjecutivoService {
  constructor(@InjectRepository(Ejecutivos) public readonly ejecutivosRepository: Repository<Ejecutivos>) {}


  async save(createEjecutivoInput: CreateEjecutivoInput) : Promise<Ejecutivos> {
    return await this.ejecutivosRepository.save(createEjecutivoInput);
  }

  async findAll(): Promise<Ejecutivos[]> {
    return await this.ejecutivosRepository.find({ relations: ['cargo' , 'grupo']});
  }

  async findOne(id: number) : Promise<Ejecutivos> {
    return await this.ejecutivosRepository.findOne(id, { relations: ['cargo', 'grupo']});
  }

  async remove(id: number) : Promise<any> {
    return await this.ejecutivosRepository.delete(id);
  }
}
