import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratosService } from 'src/contratos/contratos.service';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { MonedaService } from 'src/moneda/moneda.service';
import { PuertosService } from 'src/puertos/puertos.service';
import { Repository } from 'typeorm';
import { CreateSuplementoResumanInput } from './dto/create-suplemento-resuman.input';

@Injectable()
export class SuplementoResumenService {
  constructor(@InjectRepository(SuplementoResumen) public readonly suplementoResumenRepository: Repository<SuplementoResumen>,
  private contratosService: ContratosService,private puertosService: PuertosService,
  private ejecutivoService: EjecutivoService,private monedaService: MonedaService) {}


  async save(createSuplementoResumanInput: CreateSuplementoResumanInput) : Promise<SuplementoResumen> {
    return await this.suplementoResumenRepository.save(createSuplementoResumanInput);
  }

  async findAll(): Promise<SuplementoResumen[]> {
    return await this.suplementoResumenRepository.find({ relations: ['suplementoChanges','suplementoClausulas','suplementoDesgloses','suplementoEmbarques',
    'suplementoPagos']});
  }

  async findOne(id: number) : Promise<SuplementoResumen> {
    return await this.suplementoResumenRepository.findOne(id,{ relations: ['suplementoChanges','suplementoClausulas','suplementoDesgloses','suplementoEmbarques',
    'suplementoPagos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.suplementoResumenRepository.delete(id);
  }

  async getContrato (id: number) : Promise<Contratos>{
    return this.contratosService.findOne(id);
  }

  async getPuertoOrigen (id: number) : Promise<Puertos>{
    return this.puertosService.findOne(id);
  }

  async getPuertoDestino (id: number) : Promise<Puertos>{
    return this.puertosService.findOne(id);
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
}
