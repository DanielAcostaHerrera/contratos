import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesCMarcoClausulas } from 'src/models/entities/BasesCMarcoClausulas.entity';
import { Repository } from 'typeorm';
import { CreateBasesCmarcoClausulaInput } from './dto/create-bases-cmarco-clausula.input';

@Injectable()
export class BasesCmarcoClausulasService {
  constructor(@InjectRepository(BasesCMarcoClausulas) public readonly basesCMarcoClausulasRepository: Repository<BasesCMarcoClausulas>) {}


  async save(createBasesCmarcoClausulaInput: CreateBasesCmarcoClausulaInput) : Promise<BasesCMarcoClausulas> {
    return await this.basesCMarcoClausulasRepository.save(createBasesCmarcoClausulaInput);
  }

  async findAll(): Promise<BasesCMarcoClausulas[]> {
    return await this.basesCMarcoClausulasRepository.find({ relations: ['proformaClausulas','basesCMarco', 'tiposDeClausulas']});
  }

  async findOne(id: number) : Promise<BasesCMarcoClausulas> {
    return await this.basesCMarcoClausulasRepository.findOne(id, { relations: ['proformaClausulas','basesCMarco', 'tiposDeClausulas']});
  }

  async remove(id: number) : Promise<any> {
    return await this.basesCMarcoClausulasRepository.delete(id);
  }
}
