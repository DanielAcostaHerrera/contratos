import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesCmarcoService } from 'src/bases-cmarco/bases-cmarco.service';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { BasesCMarcoClausulas } from 'src/models/entities/BasesCMarcoClausulas.entity';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { ProformaClausulasService } from 'src/proforma-clausulas/proforma-clausulas.service';
import { TiposDeClausulasService } from 'src/tipos-de-clausulas/tipos-de-clausulas.service';
import { Repository } from 'typeorm';
import { CreateBasesCmarcoClausulaInput } from './dto/create-bases-cmarco-clausula.input';

@Injectable()
export class BasesCmarcoClausulasService {
  constructor(@InjectRepository(BasesCMarcoClausulas) public readonly basesCMarcoClausulasRepository: Repository<BasesCMarcoClausulas>, private basesCMarcoService:  BasesCmarcoService,
  private tiposDeClausulasService: TiposDeClausulasService, private proformaClausulasService: ProformaClausulasService) {}


  async save(createBasesCmarcoClausulaInput: CreateBasesCmarcoClausulaInput) : Promise<BasesCMarcoClausulas> {
    return await this.basesCMarcoClausulasRepository.save(createBasesCmarcoClausulaInput);
  }

  async findAll(): Promise<BasesCMarcoClausulas[]> {
    return await this.basesCMarcoClausulasRepository.find();
  }

  async findOne(id: number) : Promise<BasesCMarcoClausulas> {
    return await this.basesCMarcoClausulasRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const basesCMarcoClausulas = await this.findOne(id);
    return await this.basesCMarcoClausulasRepository.remove(basesCMarcoClausulas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const basesCMarcoClausulas = await this.basesCMarcoClausulasRepository.findByIds(id);
    return await this.basesCMarcoClausulasRepository.remove(basesCMarcoClausulas);
  }

  async getBaseCMarco (basesCMarcoId: number) : Promise<BasesCMarco>{
    return this.basesCMarcoService.findOne(basesCMarcoId);
  }

  async getTipoDeClausula (tipoDeClausulaId: number) : Promise<TiposDeClausulas>{
    return this.tiposDeClausulasService.findOne(tipoDeClausulaId);
  }

  async getProformaClausula (proformaClausulaId: number) : Promise<ProformaClausulas>{
    return this.proformaClausulasService.findOne(proformaClausulaId);
  }
    
}
