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
    return await this.formasEntregaRepository.find();
  }

  async findOne(id: number) : Promise<FormasEntrega> {
    return await this.formasEntregaRepository.findOne({where: {idFormaEntrega: id},});
  }

  async remove(id: number) : Promise<any> {
    const formasEntrega = await this.findOne(id);
    return await this.formasEntregaRepository.remove(formasEntrega);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const formasEntrega = await this.formasEntregaRepository.findByIds(id);
    return await this.formasEntregaRepository.remove(formasEntrega);
  }
}
