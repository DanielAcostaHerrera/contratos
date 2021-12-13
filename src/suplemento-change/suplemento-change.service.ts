import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratoClausulaService } from 'src/contrato-clausulas/contrato-clausulas.service';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { SuplementoChange } from 'src/models/entities/SuplementoChange.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoChangeInput } from './dto/create-suplemento-change.input';

@Injectable()
export class SuplementoChangeService {
  constructor(@InjectRepository(SuplementoChange) public readonly suplementoChangeRepository: Repository<SuplementoChange>,private embarquesService: EmbarquesService,
  private contratoClausulaService: ContratoClausulaService, private suplementoResumenService: SuplementoResumenService) {}


  async save(createSuplementoChangeInput: CreateSuplementoChangeInput) : Promise<SuplementoChange> {
    return await this.suplementoChangeRepository.save(createSuplementoChangeInput);
  }

  async findAll(): Promise<SuplementoChange[]> {
    return await this.suplementoChangeRepository.find();
  }

  async findOne(id: number) : Promise<SuplementoChange> {
    return await this.suplementoChangeRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.suplementoChangeRepository.delete(id);
  }

  async getSuplementoResumen (id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(id);
  }

  async getContratoClausulas (id: number) : Promise<ContratoClausulas>{
    return this.contratoClausulaService.findOne(id);
  }

  async getEmbarque (id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(id);
  }
}
