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
    return await this.monedaRepository.find({ relations: ['negociacionResumen','fichaCompraResumen','fichaCostoResumen','pliegoConcurrenciaResumenOferta'
    ,'pliegoConcurrenciaResumenPago','pliegoConcurrenciaResumenCredito','contratos','suplementoResumen']});
  }

  async findOne(id: number) : Promise<Monedas> {
    return await this.monedaRepository.findOne(id, { relations: ['negociacionResumen','fichaCompraResumen','fichaCostoResumen','pliegoConcurrenciaResumenOferta'
    ,'pliegoConcurrenciaResumenPago','pliegoConcurrenciaResumenCredito','contratos','suplementoResumen']});
  }

  async remove(id: number) : Promise<any> {
    return await this.monedaRepository.delete(id);
  }
}
