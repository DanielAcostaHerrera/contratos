import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratosService } from 'src/contratos/contratos.service';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Repository } from 'typeorm';
import { CreateContratoClausulaInput } from './dto/create-contrato-clausulas.input';

@Injectable()
export class ContratoClausulaService {
  constructor(@InjectRepository(ContratoClausulas) public readonly contratoClausulasRepository: Repository<ContratoClausulas>,private contratosService: ContratosService) {}


  async save(createContratoDesgloseInput: CreateContratoClausulaInput) : Promise<ContratoClausulas> {
    return await this.contratoClausulasRepository.save(createContratoDesgloseInput);
  }

  async findAll(): Promise<ContratoClausulas[]> {
    return await this.contratoClausulasRepository.find({relations:['suplementoChanges','suplementoClausulas']});
  }

  async findOne(id: number) : Promise<ContratoClausulas> {
    return await this.contratoClausulasRepository.findOne(id,{relations:['suplementoChanges','suplementoClausulas']});
  }

  async remove(id: number) : Promise<any> {
    return await this.contratoClausulasRepository.delete(id);
  }

  async getContrato (contratoId: number) : Promise<Contratos>{
    return this.contratosService.findOne(contratoId);
  }
}

