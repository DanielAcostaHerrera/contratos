import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { Repository } from 'typeorm';
import { CreateProformaClausulaInput } from './dto/create-proforma-clausula.input';

@Injectable()
export class ProformaClausulasService {
  constructor(@InjectRepository(ProformaClausulas) public readonly proformaRepository: Repository<ProformaClausulas>) {}


  async save(createProformaClausulaInput: CreateProformaClausulaInput) : Promise<ProformaClausulas> {
    return await this.proformaRepository.save(createProformaClausulaInput);
  }

  async findAll(): Promise<ProformaClausulas[]> {
    return await this.proformaRepository.find({ relations: ['basesCMarcoClausulas','basesGeneralesClausulas','tiposDeClausulas','proformas']});
  }

  async findOne(id: number) : Promise<ProformaClausulas> {
    return await this.proformaRepository.findOne(id,{ relations: ['basesCMarcoClausulas','basesGeneralesClausulas','tiposDeClausulas','proformas']});
  }

  async remove(id: number) : Promise<any> {
    return await this.proformaRepository.delete(id);
  }
}
