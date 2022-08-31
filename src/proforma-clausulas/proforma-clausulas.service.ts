import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { TipoContratoService } from 'src/tipo-contrato/tipo-contrato.service';
import { TiposDeClausulasService } from 'src/tipos-de-clausulas/tipos-de-clausulas.service';
import { Repository } from 'typeorm';
import { CreateProformaClausulaInput } from './dto/create-proforma-clausula.input';

@Injectable()
export class ProformaClausulasService {
  constructor(@InjectRepository(ProformaClausulas) public readonly proformaRepository: Repository<ProformaClausulas>,
  private tiposDeClausulasService: TiposDeClausulasService,private tipoContratoService: TipoContratoService, private incotermService: IncotermService) {}


  async save(createProformaClausulaInput: CreateProformaClausulaInput) : Promise<ProformaClausulas> {
    return await this.proformaRepository.save(createProformaClausulaInput);
  }

  async saveSeveral(createProformaClausulaInput: CreateProformaClausulaInput[]) : Promise<ProformaClausulas[]> {
    let result: ProformaClausulas[] = []
    for (let index = 0; index < createProformaClausulaInput.length; index++) {
      result.push(await this.proformaRepository.save(createProformaClausulaInput[index]));
    }
    return result
  }

  async findAll(): Promise<ProformaClausulas[]> {
    return await this.proformaRepository.find();
  }

  async findAllById(idTipoContrato: number, idIncoterm: number): Promise<ProformaClausulas[]> {
    return await this.proformaRepository.find({ where: {idTipoContrato, idIncoterm}, order: {
      orden: "ASC"
    }});
  }

  async findOne(id: number) : Promise<ProformaClausulas> {
    return await this.proformaRepository.findOne({where: {idProformaClausula: id},});
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

  async getTipoContrato (tipoContratoId: number) : Promise<TipoContrato>{
    return this.tipoContratoService.findOne(tipoContratoId);
  }

  async getIncoterm (incotermId: number) : Promise<Incoterm>{
    return this.incotermService.findOne(incotermId);
  }

  async removeSeveralByProformaId(idProforma: number) : Promise<any> {
    const proformaClausulas = await this.proformaRepository.find({where: {idProformaClausula: idProforma}});
    return await this.proformaRepository.remove(proformaClausulas);
  }
}
