import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';
import { Repository } from 'typeorm';
import { CreateFormasEntregaInput } from './dto/create-formas-entrega.input';

@Injectable()
export class FormasEntregaService {
  constructor(@InjectRepository(FormasEntrega) public readonly formasEntregaRepository: Repository<FormasEntrega>) {}


  async save(createFormasEntregaInput: CreateFormasEntregaInput) : Promise<FormasEntrega> {
    return await this.formasEntregaRepository.save(createFormasEntregaInput);
  }

  async findAll(): Promise<FormasEntrega[]> { 
    return await this.formasEntregaRepository.find({relations:['pliegoConcurrenciaResumen']});
  }

  async findOne(id: number) : Promise<FormasEntrega> {
    return await this.formasEntregaRepository.findOne(id,{relations:['pliegoConcurrenciaResumen']});
  }

  async remove(id: number) : Promise<any> {
    return await this.formasEntregaRepository.delete(id);
  }
}
