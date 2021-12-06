import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesCmarcoService } from 'src/bases-cmarco/bases-cmarco.service';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { BasesCMarcoEspecificos } from 'src/models/entities/BasesCMarcoEspecificos.entity';
import { Repository } from 'typeorm';
import { CreateBasesCmarcoEspecificoInput } from './dto/create-bases-cmarco-especifico.input';

@Injectable()
export class BasesCmarcoEspecificosService {
  constructor(@InjectRepository(BasesCMarcoEspecificos) public readonly basesCMarcoEspecificosRepository: Repository<BasesCMarcoEspecificos>, private basesCMarcoService:  BasesCmarcoService) {}


  async save(createBasesCmarcoEspecificosInput: CreateBasesCmarcoEspecificoInput) : Promise<BasesCMarcoEspecificos> {
    return await this.basesCMarcoEspecificosRepository.save(createBasesCmarcoEspecificosInput);
  }

  async findAll(): Promise<BasesCMarcoEspecificos[]> { 
    return await this.basesCMarcoEspecificosRepository.find();
  }

  async findOne(id: number) : Promise<BasesCMarcoEspecificos> {
    return await this.basesCMarcoEspecificosRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.basesCMarcoEspecificosRepository.delete(id);
  }

  async getBaseCMarco (basesCMarcoId: number) : Promise<BasesCMarco>{
    return this.basesCMarcoService.findOne(basesCMarcoId);
  }
}
