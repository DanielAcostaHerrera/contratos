import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgenciasAseguradorasService } from 'src/agencias-aseguradoras/agencias-aseguradoras.service';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { FormasEntregaService } from 'src/formas-entrega/formas-entrega.service';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { AgenciasAseguradoras } from 'src/modelsNomgen/entities/AgenciasAseguradoras.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { MonedaService } from 'src/moneda/moneda.service';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoResumanInput } from './dto/create-suplemento-resuman.input';

@Injectable()
export class SuplementoResumenService {
  constructor(@InjectRepository(SuplementoResumen) public readonly suplementoResumenRepository: Repository<SuplementoResumen>,
  private ejecutivoService: EjecutivoService,private monedaService: MonedaService,
  private agenciasAseguradorasService: AgenciasAseguradorasService,private companiasNavierasService: CompaniasNavierasService,
  private negociacionResumenService: NegociacionResumenService,
  private incotermService: IncotermService, private formasEntregaService: FormasEntregaService) {}


  async save(createSuplementoResumanInput: CreateSuplementoResumanInput) : Promise<SuplementoResumen> {
    return await this.suplementoResumenRepository.save(createSuplementoResumanInput);
  }

  async findAll(): Promise<SuplementoResumen[]> {
    return await this.suplementoResumenRepository.find({ relations: ['suplementoChanges','suplementoClausulas','suplementoDesgloses','suplementoEmbarques',
    'suplementoPagos','contrato','suplementoPuertoEmbarques']});
  }

  async findOne(id: number) : Promise<SuplementoResumen> {
    return await this.suplementoResumenRepository.findOne(id,{ relations: ['suplementoChanges','suplementoClausulas','suplementoDesgloses','suplementoEmbarques',
    'suplementoPagos','contrato','suplementoPuertoEmbarques']});
  }

  async remove(id: number) : Promise<any> {
    const suplementoResumen = await this.findOne(id);
    return await this.suplementoResumenRepository.remove(suplementoResumen);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoResumen = await this.suplementoResumenRepository.findByIds(id);
    return await this.suplementoResumenRepository.remove(suplementoResumen);
  }

  async getFormaEntrega (id: number) : Promise<FormasEntrega>{
    return this.formasEntregaService.findOne(id);
  }

  async getIncoterm (id: number) : Promise<Incoterm>{
    return this.incotermService.findOne(id);
  }

  async getEjecutivoSuplementa (id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(id);
  }

  async getEjecutivo (id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(id);
  }

  async getEjecutivoFirma (id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(id);
  }

  async getMoneda (id: number) : Promise<Monedas>{
    return this.monedaService.findOne(id);
  }

  async getEmpresaAseguradora (id: number) : Promise<AgenciasAseguradoras>{
    return this.agenciasAseguradorasService.findOne(id);
  }

  async getEmpresaNaviera (id: number) : Promise<CompaniasNavieras>{
    return this.companiasNavierasService.findOne(id);
  }

  async getNegociacion (id: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(id);
  }
}
