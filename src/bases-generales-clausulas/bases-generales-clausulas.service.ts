import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { In, Repository } from 'typeorm';
import { CreateBasesGeneralesClausulaInput } from './dto/create-bases-generales-clausula.input';

@Injectable()
export class BasesGeneralesClausulasService {
  constructor(@InjectRepository(BasesGeneralesClausulas) public readonly basesGeneralesClausulasRepository: Repository<BasesGeneralesClausulas>) {}


  async save(createBasesGeneralesClausulaInput: CreateBasesGeneralesClausulaInput) : Promise<BasesGeneralesClausulas> {
    return await this.basesGeneralesClausulasRepository.save(createBasesGeneralesClausulaInput);
  }

  async findAll(): Promise<BasesGeneralesClausulas[]> { 
    return await this.basesGeneralesClausulasRepository.find({order: {
      orden : "ASC"
    }, relations: ['basesGenerales','tiposDeClausulas']});
  }

  async findAllByIdBaseGeneral(idBasesGenerales: number): Promise<BasesGeneralesClausulas[]> { 
    return await this.basesGeneralesClausulasRepository.find({order: {
      orden : "ASC"
    }, where: {idBasesGenerales},relations:['tiposDeClausulas']});
  }

  async findOne(id: number) : Promise<BasesGeneralesClausulas> {
    return await this.basesGeneralesClausulasRepository.findOne({where: {idBasesGeneralesClausulas: id},relations : ['basesGenerales','tiposDeClausulas']});
  }

  async remove(id: number) : Promise<any> {
    const basesGeneralesClausulas = await this.findOne(id);
    return await this.basesGeneralesClausulasRepository.remove(basesGeneralesClausulas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const basesGeneralesClausulas = await this.basesGeneralesClausulasRepository.findBy({
      idBasesGenerales: In(id)
  });
    return await this.basesGeneralesClausulasRepository.remove(basesGeneralesClausulas);
  }

  async removeSeveralByBaseGeneralId(idBasesGenerales: number) : Promise<any> {
    const basesGeneralesClausulas = await this.basesGeneralesClausulasRepository.find({where: {idBasesGenerales}});
    return await this.basesGeneralesClausulasRepository.remove(basesGeneralesClausulas);
  }
}
