import { BasesCmarcoService } from 'src/bases-cmarco/bases-cmarco.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FichaCostoResumen } from 'src/models/entities/FichaCostoResumen.entity';
import { Repository } from 'typeorm';
import { CreateFichaCostoResumenInput } from './dto/create-ficha-costo-resuman.input';
import { MonedaService } from 'src/moneda/moneda.service';
import { FormasPagoService } from 'src/formas-pago/formas-pago.service';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { PuertosService } from 'src/puertos/puertos.service';
import { EmbalajesService } from 'src/embalajes/Embalajes.service';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Embalajes } from 'src/models/entities/Embalajes.entity';

@Injectable()
export class FichaCostoResumenService {
  constructor(@InjectRepository(FichaCostoResumen) public readonly fichaCostoResumenRepository: Repository<FichaCostoResumen>,private basesCmarcoService: BasesCmarcoService,
  private monedaService: MonedaService,private FormasPagoService: FormasPagoService,private incotermService: IncotermService,
  private puertosService: PuertosService,private embalajesService: EmbalajesService) {}


  async save(createFichaCostoResumenInput: CreateFichaCostoResumenInput) : Promise<FichaCostoResumen> {
    return await this.fichaCostoResumenRepository.save(createFichaCostoResumenInput);
  }

  async findAll(): Promise<FichaCostoResumen[]> { 
    return await this.fichaCostoResumenRepository.find();
  }

  async findOne(id: number) : Promise<FichaCostoResumen> {
    return await this.fichaCostoResumenRepository.findOne(id,{relations:['contratos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.fichaCostoResumenRepository.delete(id),{relations:['contratos']};
  }

  async getBaseCMarco (baseCMarcoId: number) : Promise<BasesCMarco>{
    return this.basesCmarcoService.findOne(baseCMarcoId);
  }

  async getMoneda (monedaId: number) : Promise<Monedas>{
    return this.monedaService.findOne(monedaId);
  }

  async getFormaPago (formaPagoId: number) : Promise<FormasPago>{
    return this.FormasPagoService.findOne(formaPagoId);
  }

  async getIncoterm (incotermId: number) : Promise<Incoterm>{
    return this.incotermService.findOne(incotermId);
  }

  async getPuerto (puertoId: number) : Promise<Puertos>{
    return this.puertosService.findOne(puertoId);
  }

  async getEmbalaje (embalajeId: number) : Promise<Embalajes>{
    return this.embalajesService.findOne(embalajeId);
  }
}
