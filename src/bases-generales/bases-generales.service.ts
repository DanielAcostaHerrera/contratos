import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Repository } from 'typeorm';
import { CreateBasesGeneralesInput } from './dto/create-bases-generales.input';

@Injectable()
export class BasesGeneralesService {
  constructor(@InjectRepository(BasesGenerales) public readonly basesGeneralesRepository: Repository<BasesGenerales>) {}


  async save(createBasesCmarcoEspecificosInput: CreateBasesGeneralesInput) : Promise<BasesGenerales> {
    return await this.basesGeneralesRepository.save(createBasesCmarcoEspecificosInput);
  }

  async findAll(): Promise<BasesGenerales[]> { 
    return await this.basesGeneralesRepository.find({ relations: ['clasificaciones','tipoDeContrato','incoterm','proforma','basesGeneralesClausulas','contratos','compradores']});
  }

  async findOne(id: number) : Promise<BasesGenerales> {
    return await this.basesGeneralesRepository.findOne(id, { relations: ['clasificaciones','tipoDeContrato','incoterm','proforma','basesGeneralesClausulas','contratos','compradores']});
  }

  async remove(id: number) : Promise<any> {
    return await this.basesGeneralesRepository.delete(id);
  }
}

