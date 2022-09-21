import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { In, Repository } from 'typeorm';
import { CreateProformaClausulaInput } from './dto/create-proforma-clausula.input';

@Injectable()
export class ProformaClausulasService {
  constructor(@InjectRepository(ProformaClausulas) public readonly proformaRepository: Repository<ProformaClausulas>) {}


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
    return await this.proformaRepository.find({relations:['tiposDeClausulas','tipoDeContrato','incoterm']});
  }

  async findAllById(idTipoContrato: number, idIncoterm: number): Promise<ProformaClausulas[]> {
    return await this.proformaRepository.find({ where: {idTipoContrato, idIncoterm},relations:['tiposDeClausulas','tipoDeContrato','incoterm']
      ,order: {
      orden: "ASC"
    }});
  }

  async findOne(id: number) : Promise<ProformaClausulas> {
    return await this.proformaRepository.findOne({where: {idProformaClausula: id},relations:['tiposDeClausulas','tipoDeContrato','incoterm']});
  }

  async remove(id: number) : Promise<any> {
    const proformaClausulas = await this.findOne(id);
    return await this.proformaRepository.remove(proformaClausulas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const proformaClausulas = await this.proformaRepository.findBy({
      idProformaClausula: In(id)
  });
    return await this.proformaRepository.remove(proformaClausulas);
  }

  async removeSeveralByProformaId(idProforma: number) : Promise<any> {
    const proformaClausulas = await this.proformaRepository.find({where: {idProformaClausula: idProforma}});
    return await this.proformaRepository.remove(proformaClausulas);
  }
}
