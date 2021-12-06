import { Injectable } from '@nestjs/common';
import { CreateBasesCmarcoInput } from './dto/create-bases-cmarco.input';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PuertosService } from 'src/puertos/puertos.service';
import { ProformasService } from 'src/proformas/proformas.service';
import { CompradoresService } from 'src/compradores/compradores.service';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';

@Injectable()
export class BasesCmarcoService {
  constructor(@InjectRepository(BasesCMarco) public readonly basesCMarcoRepository: Repository<BasesCMarco>, private puertosService:  PuertosService,
  private proformasService:  ProformasService, private compradoresService:  CompradoresService) {}


  async save(createBaseCMarcoInput: CreateBasesCmarcoInput) : Promise<BasesCMarco> {
    return await this.basesCMarcoRepository.save(createBaseCMarcoInput);
  }

  async findAll(): Promise<BasesCMarco[]> {
    return await this.basesCMarcoRepository.find({ relations: ['basesCMarcoClausulas','basesCMarcoEspecificos']});
  }

  async findOne(id: number) : Promise<BasesCMarco> {
    return await this.basesCMarcoRepository.findOne(id, { relations: ['basesCMarcoClausulas','basesCMarcoEspecificos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.basesCMarcoRepository.delete(id);
  }

  async getPuerto (puertoId: number) : Promise<Puertos>{
    return this.puertosService.findOne(puertoId);
  }

  async getProforma (proformaId: number) : Promise<Proformas>{
    return this.proformasService.findOne(proformaId);
  }

  async getComprador (compradorId: number) : Promise<Compradores>{
    return this.compradoresService.findOne(compradorId);
  }

  

}
