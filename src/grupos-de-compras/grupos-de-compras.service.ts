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
    return await this.grupoRepository.find();
  }

  async findOne(id: number) : Promise<GruposDeCompras> {
    return await this.grupoRepository.findOne({where: {idGrupo: id},});
  }

  async remove(id: number) : Promise<any> {
    const gruposDeCompras = await this.findOne(id);
    return await this.grupoRepository.remove(gruposDeCompras);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const gruposDeCompras = await this.grupoRepository.findByIds(id);
    return await this.grupoRepository.remove(gruposDeCompras);
  }
}
