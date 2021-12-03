import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Repository } from 'typeorm';
import { CreateContratoInput } from './dto/create-contrato.input';

@Injectable()
export class ContratosService {
  constructor(@InjectRepository(Contratos) public readonly contratoRepository: Repository<Contratos>) {}


  async save(createContratoInput: CreateContratoInput) : Promise<Contratos> {
    return await this.contratoRepository.save(createContratoInput);
  }

  async findAll(): Promise<Contratos[]> {
    return await this.contratoRepository.find({ relations: ['basesGenerales','tipoContrato','proformas','contratoDesgloses','documentacionContratos']});
  }

  async findOne(id: number) : Promise<Contratos> {
    return await this.contratoRepository.findOne(id, { relations: ['basesGenerales','tipoContrato','proformas','contratoDesgloses','documentacionContratos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.contratoRepository.delete(id);
  }
}