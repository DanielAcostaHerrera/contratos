import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { TipoContratoService } from 'src/tipo-contrato/tipo-contrato.service';
import { Repository } from 'typeorm';
import { CreateProformaInput } from './dto/create-proforma.input';

@Injectable()
export class ProformasService {
  constructor(@InjectRepository(Proformas) public readonly proformaRepository: Repository<Proformas>,
  private tipoContratoService: TipoContratoService, private incotermService: IncotermService) {}

  async save(createProformaInput: CreateProformaInput) : Promise<Proformas> {
    return await this.proformaRepository.save(createProformaInput);
  }

  async findAll(): Promise<Proformas[]> {
    return await this.proformaRepository.find({ relations: ['proformaClausulas','basesGenerales']});
  }

  async findOne(id: number) : Promise<Proformas> {
    return await this.proformaRepository.findOne(id,{ relations: ['proformaClausulas','basesGenerales']});
  }

  async remove(id: number) : Promise<any> {
    const proformas = await this.findOne(id);
    return await this.proformaRepository.remove(proformas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const proformas = await this.proformaRepository.findByIds(id);
    return await this.proformaRepository.remove(proformas);
  }
  
  async getTipoContrato (tipoContratoId: number) : Promise<TipoContrato>{
    return this.tipoContratoService.findOne(tipoContratoId);
  }

  async getIncoterm (incotermId: number) : Promise<Incoterm>{
    return this.incotermService.findOne(incotermId);
  }
}
