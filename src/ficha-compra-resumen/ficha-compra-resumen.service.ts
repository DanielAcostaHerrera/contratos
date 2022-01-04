import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratosService } from 'src/contratos/contratos.service';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { FichaCompraResumen } from 'src/models/entities/FichaCompraResumen.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { MonedaService } from 'src/moneda/moneda.service';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { Repository } from 'typeorm';
import { CreateFichaCompraResumanInput } from './dto/create-ficha-compra-resuman.input';

@Injectable()
export class FichaCompraResumenService {
  constructor(@InjectRepository(FichaCompraResumen) public readonly fichaCompraResumenRepository: Repository<FichaCompraResumen>,private monedaService: MonedaService,
  private incotermService: IncotermService,private contratosService: ContratosService,private negociacionResumenService: NegociacionResumenService) {}


  async save(createFichaCompraResumanInput: CreateFichaCompraResumanInput) : Promise<FichaCompraResumen> {
    return await this.fichaCompraResumenRepository.save(createFichaCompraResumanInput);
  }

  async findAll(): Promise<FichaCompraResumen[]> { 
    return await this.fichaCompraResumenRepository.find({relations:['fichaCompraDetalles']});
  }

  async findOne(id: number) : Promise<FichaCompraResumen> {
    return await this.fichaCompraResumenRepository.findOne(id,{relations:['fichaCompraDetalles']});
  }

  async remove(id: number) : Promise<any> {
    const fichaCompraResumen = await this.findOne(id);
    return await this.fichaCompraResumenRepository.remove(fichaCompraResumen);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const fichaCompraResumen = await this.fichaCompraResumenRepository.findByIds(id);
    return await this.fichaCompraResumenRepository.remove(fichaCompraResumen);
  }

  async getMoneda (monedaId: number) : Promise<Monedas>{
    return this.monedaService.findOne(monedaId);
  }

  async getIncoterm (incotermId: number) : Promise<Incoterm>{
    return this.incotermService.findOne(incotermId);
  }

  async getContrato (contratoId: number) : Promise<Contratos>{
    return this.contratosService.findOne(contratoId);
  }

  async getNegociacionResumen (negociacionId: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(negociacionId);
  }
}
