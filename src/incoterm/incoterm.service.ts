import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Repository } from 'typeorm';
import { CreateIncotermInput } from './dto/create-incoterm.input';

@Injectable()
export class IncotermService {
  constructor(@InjectRepository(Incoterm) public readonly grupoRepository: Repository<Incoterm>) {}

  async save(CreateGruposDeCompraInput: CreateIncotermInput) : Promise<Incoterm> {
    return await this.grupoRepository.save(CreateGruposDeCompraInput);
  }

  async findAll(): Promise<Incoterm[]> {
    return await this.grupoRepository.find();
  }

  async findOne(id: number) : Promise<Incoterm> {
    return await this.grupoRepository.findOne({where: {idIncoterm: id},});
  }

  async remove(id: number) : Promise<any> {
    const incoterm = await this.findOne(id);
    return await this.grupoRepository.remove(incoterm);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const incoterm = await this.grupoRepository.findByIds(id);
    return await this.grupoRepository.remove(incoterm);
  }
}
