import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { ProformasService } from 'src/proformas/proformas.service';
import { TiposDeClausulasService } from 'src/tipos-de-clausulas/tipos-de-clausulas.service';
import { Repository } from 'typeorm';
import { CreateProformaClausulaInput } from './dto/create-proforma-clausula.input';

@Injectable()
export class ProformaClausulasService {
  constructor(@InjectRepository(ProformaClausulas) public readonly proformaRepository: Repository<ProformaClausulas>,
  private tiposDeClausulasService: TiposDeClausulasService,private proformasService: ProformasService) {}


  async save(createProformaClausulaInput: CreateProformaClausulaInput) : Promise<ProformaClausulas> {
    return await this.proformaRepository.save(createProformaClausulaInput);
  }

  async findAll(): Promise<ProformaClausulas[]> {
    return await this.proformaRepository.find({ relations: ['basesGeneralesClausulas']});
  }

  async findAllById(idProforma: number): Promise<ProformaClausulas[]> {
    return await this.proformaRepository.find({ where: {idProforma}, relations: ['basesGeneralesClausulas'], order: {
      orden: "ASC"
    }});
  }

  async findOne(id: number) : Promise<ProformaClausulas> {
    return await this.proformaRepository.findOne(id,{ relations: ['basesGeneralesClausulas']});
  }

  async remove(id: number) : Promise<any> {
    const proformaClausulas = await this.findOne(id);
    return await this.proformaRepository.remove(proformaClausulas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const proformaClausulas = await this.proformaRepository.findByIds(id);
    return await this.proformaRepository.remove(proformaClausulas);
  }

  async getTipoClausula (tipoClausulaId: number) : Promise<TiposDeClausulas>{
    return this.tiposDeClausulasService.findOne(tipoClausulaId);
  }

  async getProforma (proformaId: number) : Promise<Proformas>{
    return this.proformasService.findOne(proformaId);
  }
}
