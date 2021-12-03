import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { Repository } from 'typeorm';
import { CreateProformaInput } from './dto/create-proforma.input';

@Injectable()
export class ProformasService {
  constructor(@InjectRepository(Proformas) public readonly proformaRepository: Repository<Proformas>) {}


  async save(createProformaInput: CreateProformaInput) : Promise<Proformas> {
    return await this.proformaRepository.save(createProformaInput);
  }

  async findAll(): Promise<Proformas[]> {
    return await this.proformaRepository.find({ relations: ['basesCMarco','proformaClausulas','basesGenerales','contratos']});
  }

  async findOne(id: number) : Promise<Proformas> {
    return await this.proformaRepository.findOne(id,{ relations: ['basesCMarco','proformaClausulas','basesGenerales','contratos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.proformaRepository.delete(id);
  }
}
