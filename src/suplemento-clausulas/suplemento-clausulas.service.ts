import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratoClausulaService } from 'src/contrato-clausulas/contrato-clausulas.service';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { SuplementoClausulas } from 'src/models/entities/SuplementoClausulas.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoClausulaInput } from './dto/create-suplemento-clausula.input';

@Injectable()
export class SuplementoClausulasService {
  constructor(@InjectRepository(SuplementoClausulas) public readonly suplementoClausulaRepository: Repository<SuplementoClausulas>,
  private contratoClausulaService: ContratoClausulaService, private suplementoResumenService: SuplementoResumenService) {}


  async save(createSuplementoClausulaInput: CreateSuplementoClausulaInput) : Promise<SuplementoClausulas> {
    return await this.suplementoClausulaRepository.save(createSuplementoClausulaInput);
  }

  async findAll(): Promise<SuplementoClausulas[]> {
    return await this.suplementoClausulaRepository.find();
  }

  async findOne(id: number) : Promise<SuplementoClausulas> {
    return await this.suplementoClausulaRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.suplementoClausulaRepository.delete(id);
  }

  async getSuplementoResumen (id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(id);
  }

  async getContratoClausulas (id: number) : Promise<ContratoClausulas>{
    return this.contratoClausulaService.findOne(id);
  }
}