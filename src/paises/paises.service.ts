import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaisesService {
  constructor(@InjectRepository(Paises) public readonly paisesRepository: Repository<Paises>) {}

  async findAll(): Promise<Paises[]> {
    return await this.paisesRepository.find({relations: ['basesGenerales','campanaEtapasContratacion','contratos','pliegoConcurrenciaResumen','facturaDesgloses',
  'tiemposTravesias','fichaCompraResumen','fichaCostoResumen']});
  }

  async findOne(id: number) : Promise<Paises> {
    return await this.paisesRepository.findOne(id,{relations: ['basesGenerales','campanaEtapasContratacion','contratos','pliegoConcurrenciaResumen','facturaDesgloses',
  'tiemposTravesias','fichaCompraResumen','fichaCostoResumen']});
  }
}
