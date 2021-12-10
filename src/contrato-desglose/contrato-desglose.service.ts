import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Repository } from 'typeorm';
import { CreateContratoDesgloseInput } from './dto/create-contrato-desglose.input';

@Injectable()
export class ContratoDesgloseService {
  constructor(@InjectRepository(ContratoDesglose) public readonly contratoDesgloseRepository: Repository<ContratoDesglose>,private embarquesService: EmbarquesService) {}


  async save(createContratoDesgloseInput: CreateContratoDesgloseInput) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.save(createContratoDesgloseInput);
  }

  async findAll(): Promise<ContratoDesglose[]> {
    return await this.contratoDesgloseRepository.find();
  }

  async findOne(id: number) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.contratoDesgloseRepository.delete(id);
  }

  async getEmbarque (Id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(Id);
  }
}
