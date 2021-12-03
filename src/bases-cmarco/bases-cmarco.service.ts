import { Injectable } from '@nestjs/common';
import { CreateBasesCmarcoInput } from './dto/create-bases-cmarco.input';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BasesCmarcoService {
  constructor(@InjectRepository(BasesCMarco) public readonly basesCMarcoRepository: Repository<BasesCMarco>) {}


  async save(createBaseCMarcoInput: CreateBasesCmarcoInput) : Promise<BasesCMarco> {
    return await this.basesCMarcoRepository.save(createBaseCMarcoInput);
  }

  async findAll(): Promise<BasesCMarco[]> {
    return await this.basesCMarcoRepository.find({ relations: ['basesCMarcoClausulas','basesCMarcoEspecificos', 'puerto', 'proforma', 'compradores']});
  }

  async findOne(id: number) : Promise<BasesCMarco> {
    return await this.basesCMarcoRepository.findOne(id, { relations: ['basesCMarcoClausulas','basesCMarcoEspecificos','puerto', 'proforma', 'compradores']});
  }

  async remove(id: number) : Promise<any> {
    return await this.basesCMarcoRepository.delete(id);
  }
}
