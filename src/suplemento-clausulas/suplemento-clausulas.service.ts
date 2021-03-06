import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuplementoClausulas } from 'src/models/entities/SuplementoClausulas.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoClausulaInput } from './dto/create-suplemento-clausula.input';

@Injectable()
export class SuplementoClausulasService {
  constructor(@InjectRepository(SuplementoClausulas) public readonly suplementoClausulaRepository: Repository<SuplementoClausulas>,
  private suplementoResumenService: SuplementoResumenService) {}


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
    const suplementoClausulas = await this.findOne(id);
    return await this.suplementoClausulaRepository.remove(suplementoClausulas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoClausulas = await this.suplementoClausulaRepository.findByIds(id);
    return await this.suplementoClausulaRepository.remove(suplementoClausulas);
  }

  async removeSeveralByContratoIdSuplementoResumenId(idContrato: number, idSuplementoResumen: number) : Promise<any> {
    const contratosClausulas = await this.suplementoClausulaRepository.find({where: {idSuplementoResumen,idContrato}});
    return await this.suplementoClausulaRepository.remove(contratosClausulas);
  }

  async getSuplementoResumen (id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(id);
  }
}