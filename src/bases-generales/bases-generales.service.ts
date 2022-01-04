import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClasificacionesService } from 'src/clasificaciones/clasificaciones.service';
import { CompradoresService } from 'src/compradores/compradores.service';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Clasificaciones } from 'src/models/entities/Clasificaciones.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { ProformasService } from 'src/proformas/proformas.service';
import { TipoContratoService } from 'src/tipo-contrato/tipo-contrato.service';
import { Repository } from 'typeorm';
import { CreateBasesGeneralesInput } from './dto/create-bases-generales.input';

@Injectable()
export class BasesGeneralesService {
  constructor(@InjectRepository(BasesGenerales) public readonly basesGeneralesRepository: Repository<BasesGenerales>, private clasificacionesService: ClasificacionesService,
  private tipoContratoService: TipoContratoService, private incotermService: IncotermService, private proformasService: ProformasService, private compradoresService: CompradoresService) {}

  async save(createBasesCmarcoEspecificosInput: CreateBasesGeneralesInput) : Promise<BasesGenerales> {
    return await this.basesGeneralesRepository.save(createBasesCmarcoEspecificosInput);
  }

  async findAll(): Promise<BasesGenerales[]> { 
    return await this.basesGeneralesRepository.find({ relations: ['basesGeneralesClausulas','contratos']});
  }

  async findOne(id: number) : Promise<BasesGenerales> {
    return await this.basesGeneralesRepository.findOne(id, { relations: ['basesGeneralesClausulas','contratos']});
  }

  async remove(id: number) : Promise<any> {
    const basesGenerales = await this.findOne(id);
    return await this.basesGeneralesRepository.remove(basesGenerales);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const basesGenerales = await this.basesGeneralesRepository.findByIds(id);
    return await this.basesGeneralesRepository.remove(basesGenerales);
  }

  async getClasificacion (clasificacionId: number) : Promise<Clasificaciones>{
    return this.clasificacionesService.findOne(clasificacionId);
  }

  async getTipoContrato (tipoContratoId: number) : Promise<TipoContrato>{
    return this.tipoContratoService.findOne(tipoContratoId);
  }

  async getIncoterm (incotermId: number) : Promise<Incoterm>{
    return this.incotermService.findOne(incotermId);
  }

  async getProforma (proformaId: number) : Promise<Proformas>{
    return this.proformasService.findOne(proformaId);
  }

  async getComprador (compradorId: number) : Promise<Compradores>{
    return this.compradoresService.findOne(compradorId);
  }
}

