import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgenciasAseguradoras } from 'src/modelsNomgen/entities/AgenciasAseguradoras.entity';

@Injectable()
export class AgenciasAseguradorasService {
  constructor(@InjectRepository(AgenciasAseguradoras) public readonly agenciasAseguradorasRepository: Repository<AgenciasAseguradoras>) {}

  async findAll(): Promise<AgenciasAseguradoras[]> {
    return await this.agenciasAseguradorasRepository.find({relations:['contratos','suplementoResumen']});
  }

  async findOne(id: number) : Promise<AgenciasAseguradoras> {
    return await this.agenciasAseguradorasRepository.findOne(id,{relations:['contratos','suplementoResumen']});
  }
}
