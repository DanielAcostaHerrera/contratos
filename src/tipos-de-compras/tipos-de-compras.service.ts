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
    return await this.tiposDeCompraRepository.find();
  }

  async findOne(id: number) : Promise<TiposDeCompras> {
    return await this.tiposDeCompraRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const tiposDeCompras = await this.findOne(id);
    return await this.tiposDeCompraRepository.remove(tiposDeCompras);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const tiposDeCompras = await this.tiposDeCompraRepository.findByIds(id);
    return await this.tiposDeCompraRepository.remove(tiposDeCompras);
  }
}
