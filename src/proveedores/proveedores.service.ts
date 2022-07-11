import { Proveedores } from './../modelsMercurio/entities/Proveedores.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedoresService {
  constructor(@InjectRepository(Proveedores) public readonly proveedoresRepository: Repository<Proveedores>) {}

  async findAll(): Promise<Proveedores[]> {
    return await this.proveedoresRepository.find({ relations: ['basesGenerales','solicitudOfertasProveedores','pliegoConcurrenciaResumen',
  'negociacionProveedores']});
  }

  async findOne(id: number) : Promise<Proveedores> {
    return await this.proveedoresRepository.findOne(id,{ relations: ['basesGenerales','solicitudOfertasProveedores','pliegoConcurrenciaResumen',
  'negociacionProveedores']});
  }
}
