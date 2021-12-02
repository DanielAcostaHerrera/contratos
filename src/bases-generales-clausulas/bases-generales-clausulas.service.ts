import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { Repository } from 'typeorm';
import { CreateBasesGeneralesClausulaInput } from './dto/create-bases-generales-clausula.input';

@Injectable()
export class BasesGeneralesClausulasService {
  constructor(@InjectRepository(BasesGeneralesClausulas) public readonly basesGeneralesClausulasRepository: Repository<BasesGeneralesClausulas>) {}


  async save(createBasesGeneralesClausulaInput: CreateBasesGeneralesClausulaInput) : Promise<BasesGeneralesClausulas> {
    return await this.basesGeneralesClausulasRepository.save(createBasesGeneralesClausulaInput);
  }

  async findAll(): Promise<BasesGeneralesClausulas[]> { 
    return await this.basesGeneralesClausulasRepository.find({ relations: ['tiposDeClausulas','basesGenerales','proformaClausula']});
  }

  async findOne(id: number) : Promise<BasesGeneralesClausulas> {
    return await this.basesGeneralesClausulasRepository.findOne(id, { relations: ['tiposDeClausulas','basesGenerales','proformaClausula']});
  }

  async remove(id: number) : Promise<any> {
    return await this.basesGeneralesClausulasRepository.delete(id);
  }
}
