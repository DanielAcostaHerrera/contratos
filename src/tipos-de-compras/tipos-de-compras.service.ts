import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposDeCompras } from 'src/models/entities/TiposDeCompras.entity';
import { Repository } from 'typeorm';
import { CreateTiposDeCompraInput } from './dto/create-tipos-de-compra.input';

@Injectable()
export class TiposDeComprasService {
  constructor(@InjectRepository(TiposDeCompras) public readonly tiposDeCompraRepository: Repository<TiposDeCompras>) {}


  async save(createTiposDeCompraInput: CreateTiposDeCompraInput) : Promise<TiposDeCompras> {
    return await this.tiposDeCompraRepository.save(createTiposDeCompraInput);
  }

  async findAll(): Promise<TiposDeCompras[]> {
    return await this.tiposDeCompraRepository.find({ relations: ['negociacionResumen']});
  }

  async findOne(id: number) : Promise<TiposDeCompras> {
    return await this.tiposDeCompraRepository.findOne(id,{ relations: ['negociacionResumen']});
  }

  async remove(id: number) : Promise<any> {
    return await this.tiposDeCompraRepository.delete(id);
  }
}
