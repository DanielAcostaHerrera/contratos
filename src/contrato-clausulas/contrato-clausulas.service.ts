import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { Repository } from 'typeorm';
import { CreateContratoClausulaInput } from './dto/create-contrato-clausulas.input';

@Injectable()
export class ContratoClausulaService {
  constructor(@InjectRepository(ContratoClausulas) public readonly contratoClausulasRepository: Repository<ContratoClausulas>) {}


  async save(createContratoDesgloseInput: CreateContratoClausulaInput) : Promise<ContratoClausulas> {
    return await this.contratoClausulasRepository.save(createContratoDesgloseInput);
  }

  async findAll(): Promise<ContratoClausulas[]> {
    return await this.contratoClausulasRepository.find({relations:['contratos']});
  }

  async findOne(id: number) : Promise<ContratoClausulas> {
    return await this.contratoClausulasRepository.findOne(id,{relations:['contratos']});
  }

  async remove(id: number) : Promise<any> {
    const contratoClausulas = await this.findOne(id);
    return await this.contratoClausulasRepository.remove(contratoClausulas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const contratoClausulas = await this.contratoClausulasRepository.findByIds(id);
    return await this.contratoClausulasRepository.remove(contratoClausulas);
  }

  async removeSeveralByContratoId(idContrato: number) : Promise<any> {
    const contratosClausulas = await this.contratoClausulasRepository.find({where: {idContrato}});
    return await this.contratoClausulasRepository.remove(contratosClausulas);
  }
}

