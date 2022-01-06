import { EspecificosService } from './../especificos/especificos.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesCmarcoService } from 'src/bases-cmarco/bases-cmarco.service';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { BasesCMarcoEspecificos } from 'src/models/entities/BasesCMarcoEspecificos.entity';
import { Repository } from 'typeorm';
import { CreateBasesCmarcoEspecificoInput } from './dto/create-bases-cmarco-especifico.input';
import { Especificos } from 'src/modelsMercurio/entities/Especificos.entity';

@Injectable()
export class BasesCmarcoEspecificosService {
  constructor(@InjectRepository(BasesCMarcoEspecificos) public readonly basesCMarcoEspecificosRepository: Repository<BasesCMarcoEspecificos>, 
  private basesCMarcoService:  BasesCmarcoService, private especificosService:  EspecificosService) {}


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
    const basesCMarcoEspecificos = await this.findOne(id);
    return await this.basesCMarcoEspecificosRepository.remove(basesCMarcoEspecificos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const basesCMarcoEspecificos = await this.basesCMarcoEspecificosRepository.findByIds(id);
    return await this.basesCMarcoEspecificosRepository.remove(basesCMarcoEspecificos);
  }

  async getBaseCMarco (basesCMarcoId: number) : Promise<BasesCMarco>{
    return this.basesCMarcoService.findOne(basesCMarcoId);
  }

  async getEspecifico (especificoId: number) : Promise<Especificos>{
    return this.especificosService.findOne(especificoId);
  }
}
