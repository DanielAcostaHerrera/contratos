import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { Repository } from 'typeorm';
import { CreateTiposDeClausulaInput } from './dto/create-tipos-de-clausula.input';

@Injectable()
export class TiposDeClausulasService {
  constructor(@InjectRepository(TiposDeClausulas) public readonly tiposDeClausulaRepository: Repository<TiposDeClausulas>) {}


  async save(createTiposDeClausulaInput: CreateTiposDeClausulaInput) : Promise<TiposDeClausulas> {
    return await this.tiposDeClausulaRepository.save(createTiposDeClausulaInput);
  }

  async findAll(): Promise<TiposDeClausulas[]> {
    return await this.tiposDeClausulaRepository.find({ relations: ['basesCMarcoClausulas','basesGeneralesClausulas','proformaClausulas']});
  }

  async findOne(id: number) : Promise<TiposDeClausulas> {
    return await this.tiposDeClausulaRepository.findOne(id,{ relations: ['basesCMarcoClausulas','basesGeneralesClausulas','proformaClausulas']});
  }

  async remove(id: number) : Promise<any> {
    const tiposDeClausulas = await this.findOne(id);
    return await this.tiposDeClausulaRepository.remove(tiposDeClausulas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const tiposDeClausulas = await this.tiposDeClausulaRepository.findByIds(id);
    return await this.tiposDeClausulaRepository.remove(tiposDeClausulas);
  }
}
