import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesCMarcoEspecificos } from 'src/models/entities/BasesCMarcoEspecificos.entity';
import { Repository } from 'typeorm';
import { CreateBasesCmarcoEspecificoInput } from './dto/create-bases-cmarco-especifico.input';

@Injectable()
export class BasesCmarcoEspecificosService {
  constructor(@InjectRepository(BasesCMarcoEspecificos) public readonly basesCMarcoClausulasRepository: Repository<BasesCMarcoEspecificos>) {}


  async save(createBasesCmarcoEspecificosInput: CreateBasesCmarcoEspecificoInput) : Promise<BasesCMarcoEspecificos> {
    return await this.basesCMarcoClausulasRepository.save(createBasesCmarcoEspecificosInput);
  }

  async findAll(): Promise<BasesCMarcoEspecificos[]> { 
    return await this.basesCMarcoClausulasRepository.find({ relations: ['baseCMarco']});
  }

  async findOne(id: number) : Promise<BasesCMarcoEspecificos> {
    return await this.basesCMarcoClausulasRepository.findOne(id, { relations: ['baseCMarco']});
  }

  async remove(id: number) : Promise<any> {
    return await this.basesCMarcoClausulasRepository.delete(id);
  }
}
