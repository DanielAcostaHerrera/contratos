import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesGeneralesService } from 'src/bases-generales/bases-generales.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { ProformaClausulasService } from 'src/proforma-clausulas/proforma-clausulas.service';
import { TiposDeClausulasService } from 'src/tipos-de-clausulas/tipos-de-clausulas.service';
import { Repository } from 'typeorm';
import { CreateBasesGeneralesClausulaInput } from './dto/create-bases-generales-clausula.input';

@Injectable()
export class BasesGeneralesClausulasService {
  constructor(@InjectRepository(BasesGeneralesClausulas) public readonly basesGeneralesClausulasRepository: Repository<BasesGeneralesClausulas>,
  private tiposDeClausulasService: TiposDeClausulasService, private basesGeneralesService: BasesGeneralesService, private proformaClausulasService: ProformaClausulasService) {}


  async save(createBasesGeneralesClausulaInput: CreateBasesGeneralesClausulaInput) : Promise<BasesGeneralesClausulas> {
    return await this.basesGeneralesClausulasRepository.save(createBasesGeneralesClausulaInput);
  }

  async findAll(): Promise<BasesGeneralesClausulas[]> { 
    return await this.basesGeneralesClausulasRepository.find();
  }

  async findOne(id: number) : Promise<BasesGeneralesClausulas> {
    return await this.basesGeneralesClausulasRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const basesGeneralesClausulas = await this.findOne(id);
    return await this.basesGeneralesClausulasRepository.remove(basesGeneralesClausulas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const basesGeneralesClausulas = await this.basesGeneralesClausulasRepository.findByIds(id);
    return await this.basesGeneralesClausulasRepository.remove(basesGeneralesClausulas);
  }

  async getTipoClausula (tipoClausulaId: number) : Promise<TiposDeClausulas>{
    return this.tiposDeClausulasService.findOne(tipoClausulaId);
  }

  async getBasesGenerales (basesGeneralesId: number) : Promise<BasesGenerales>{
    return this.basesGeneralesService.findOne(basesGeneralesId);
  }

  async getProformaClausulas (proformaClausulasId: number) : Promise<ProformaClausulas>{
    return this.proformaClausulasService.findOne(proformaClausulasId);
  }
}
