import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Monedas } from '../models/entities/Monedas.entity';
import { Repository } from 'typeorm';
import { CreateMonedaInput } from './dto/create-moneda.input';

@Injectable()
export class MonedaService {
  constructor(@InjectRepository(Monedas) public readonly monedaRepository: Repository<Monedas>) {}


  async save(createMonedaInput: CreateMonedaInput) : Promise<Monedas> {
    return await this.monedaRepository.save(createMonedaInput);
  }

  async findAll(): Promise<Monedas[]> {
    return await this.monedaRepository.find();
  }

  async findOne(id: number) : Promise<Monedas> {
    return await this.monedaRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const monedas = await this.findOne(id);
    return await this.monedaRepository.remove(monedas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const monedas = await this.monedaRepository.findByIds(id);
    return await this.monedaRepository.remove(monedas);
  }
}
