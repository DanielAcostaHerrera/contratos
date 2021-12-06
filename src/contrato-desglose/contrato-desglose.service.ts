import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratosService } from 'src/contratos/contratos.service';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Repository } from 'typeorm';
import { CreateContratoDesgloseInput } from './dto/create-contrato-desglose.input';

@Injectable()
export class ContratoDesgloseService {
  constructor(@InjectRepository(ContratoDesglose) public readonly contratoDesgloseRepository: Repository<ContratoDesglose>,private contratosService: ContratosService) {}


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

  async getContrato (contratoId: number) : Promise<Contratos>{
    return this.contratosService.findOne(contratoId);
  }
}

