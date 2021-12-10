import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratosService } from 'src/contratos/contratos.service';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { FacturaResumen } from 'src/models/entities/FacturaResumen.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { PuertosService } from 'src/puertos/puertos.service';
import { Repository } from 'typeorm';
import { CreateFacturaResumanInput } from './dto/create-factura-resuman.input';

@Injectable()
export class FacturaResumenService {
  constructor(@InjectRepository(FacturaResumen) public readonly facturaResumenRepository: Repository<FacturaResumen>,
  private contratosService: ContratosService,private embarquesService: EmbarquesService,
  private ejecutivoService: EjecutivoService,private negociacionResumenService: NegociacionResumenService,
  private puertosService: PuertosService) {}


  async save(createFacturaResumanInput: CreateFacturaResumanInput) : Promise<FacturaResumen> {
    return await this.facturaResumenRepository.save(createFacturaResumanInput);
  }

  async findAll(): Promise<FacturaResumen[]> { 
    return await this.facturaResumenRepository.find({relations:['facturaContenedores','facturaDesgloses']});
  }

  async findOne(id: number) : Promise<FacturaResumen> {
    return await this.facturaResumenRepository.findOne(id,{relations:['facturaContenedores','facturaDesgloses']});
  }

  async remove(id: number) : Promise<any> {
    return await this.facturaResumenRepository.delete(id);
  }

  async getContrato (Id: number) : Promise<Contratos>{
    return this.contratosService.findOne(Id);
  }

  async getEmbarque (Id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(Id);
  }

  async getEjecutivo (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getEjecutivoRealiza (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getNegociacionResumen (Id: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(Id);
  }

  async getPuertoDestino (Id: number) : Promise<Puertos>{
    return this.puertosService.findOne(Id);
  }
}
