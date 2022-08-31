import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { ProformaClausulasService } from 'src/proforma-clausulas/proforma-clausulas.service';
import { TiposDeClausulasService } from 'src/tipos-de-clausulas/tipos-de-clausulas.service';
import { Repository } from 'typeorm';
import { CreateBasesGeneralesClausulaInput } from './dto/create-bases-generales-clausula.input';

@Injectable()
export class BasesGeneralesClausulasService {
  constructor(@InjectRepository(BasesGeneralesClausulas) public readonly basesGeneralesClausulasRepository: Repository<BasesGeneralesClausulas>,
  private tiposDeClausulasService: TiposDeClausulasService) {}


  async save(createBasesGeneralesClausulaInput: CreateBasesGeneralesClausulaInput) : Promise<BasesGeneralesClausulas> {
    return await this.basesGeneralesClausulasRepository.save(createBasesGeneralesClausulaInput);
  }

  async findAll(): Promise<BasesGeneralesClausulas[]> { 
    return await this.basesGeneralesClausulasRepository.find({order: {
      orden : "ASC"
    }, relations: ['basesGenerales']});
  }

  async findAllByIdBaseGeneral(idBasesGenerales: number): Promise<BasesGeneralesClausulas[]> { 
    return await this.basesGeneralesClausulasRepository.find({order: {
      orden : "ASC"
    }, where: {idBasesGenerales}});
  }

  async findOne(id: number) : Promise<BasesGeneralesClausulas> {
    return await this.basesGeneralesClausulasRepository.findOne({where: {idBasesGeneralesClausulas: id},relations : ['basesGenerales']});
  }

  async remove(id: number) : Promise<any> {
    const basesGeneralesClausulas = await this.findOne(id);
    return await this.basesGeneralesClausulasRepository.remove(basesGeneralesClausulas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const basesGeneralesClausulas = await this.basesGeneralesClausulasRepository.findByIds(id);
    return await this.basesGeneralesClausulasRepository.remove(basesGeneralesClausulas);
  }

  async removeSeveralByBaseGeneralId(idBasesGenerales: number) : Promise<any> {
    const basesGeneralesClausulas = await this.basesGeneralesClausulasRepository.find({where: {idBasesGenerales}});
    return await this.basesGeneralesClausulasRepository.remove(basesGeneralesClausulas);
  }

  async getTipoClausula (tipoClausulaId: number) : Promise<TiposDeClausulas>{
    return this.tiposDeClausulasService.findOne(tipoClausulaId);
  }
}
