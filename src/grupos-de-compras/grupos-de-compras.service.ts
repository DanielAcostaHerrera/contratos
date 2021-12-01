import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { CreateGruposDeCompraInput } from './dto/create-grupos-de-compra.input';

@Injectable()
export class GruposDeComprasService {
  constructor(@InjectRepository(GruposDeCompras) public readonly grupoRepository: Repository<GruposDeCompras>) {}


  async save(CreateGruposDeCompraInput: CreateGruposDeCompraInput) : Promise<GruposDeCompras> {
    return await this.grupoRepository.save(CreateGruposDeCompraInput);
  }

  async findAll(): Promise<GruposDeCompras[]> {
    return await this.grupoRepository.find({ relations: ['ejecutivos']});
  }

  async findOne(id: number) : Promise<GruposDeCompras> {
    return await this.grupoRepository.findOne(id, { relations: ['ejecutivos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.grupoRepository.delete(id);
  }
}
