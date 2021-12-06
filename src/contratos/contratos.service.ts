import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasesGeneralesService } from 'src/bases-generales/bases-generales.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { ProformasService } from 'src/proformas/proformas.service';
import { TipoContratoService } from 'src/tipo-contrato/tipo-contrato.service';
import { Repository } from 'typeorm';
import { CreateContratoInput } from './dto/create-contrato.input';

@Injectable()
export class ContratosService {
  constructor(@InjectRepository(Contratos) public readonly contratoRepository: Repository<Contratos>,private basesGeneralesService: BasesGeneralesService,
  private tipoContratoService: TipoContratoService,private proformasService: ProformasService) {}


  async save(createContratoInput: CreateContratoInput) : Promise<Contratos> {
    return await this.contratoRepository.save(createContratoInput);
  }

  async findAll(): Promise<Contratos[]> {
    return await this.contratoRepository.find({ relations: ['contratoDesgloses','documentacionContratos']});
  }

  async findOne(id: number) : Promise<Contratos> {
    return await this.contratoRepository.findOne(id, { relations: ['contratoDesgloses','documentacionContratos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.contratoRepository.delete(id);
  }

  async getBasesGenerales (basesGeneralesId: number) : Promise<BasesGenerales>{
    return this.basesGeneralesService.findOne(basesGeneralesId);
  }

  async getTipoContrato (tipoContratoId: number) : Promise<TipoContrato>{
    return this.tipoContratoService.findOne(tipoContratoId);
  }

  async getProforma (proformaId: number) : Promise<Proformas>{
    return this.proformasService.findOne(proformaId);
  }
}