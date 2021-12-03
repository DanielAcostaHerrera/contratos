import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { Repository } from 'typeorm';
import { CreateContratoDesgloseInput } from './dto/create-contrato-desglose.input';

@Injectable()
export class ContratoDesgloseService {
  constructor(@InjectRepository(ContratoDesglose) public readonly contratoDesgloseRepository: Repository<ContratoDesglose>) {}


  async save(createContratoDesgloseInput: CreateContratoDesgloseInput) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.save(createContratoDesgloseInput);
  }

  async findAll(): Promise<ContratoDesglose[]> {
    return await this.contratoDesgloseRepository.find({ relations: ['contratos']});
  }

  async findOne(id: number) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.findOne(id, { relations: ['contratos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.contratoDesgloseRepository.delete(id);
  }
}

