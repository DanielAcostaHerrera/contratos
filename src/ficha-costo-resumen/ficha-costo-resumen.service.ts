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
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Embalajes } from 'src/models/entities/Embalajes.entity';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { PaisesService } from 'src/paises/paises.service';
import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { ContratoMarco } from 'src/models/entities/ContratoMarco.entity';
import { ContratoMarcoService } from 'src/contrato-marco/contrato-marco.service';

@Injectable()
export class FichaCostoResumenService {
  constructor(@InjectRepository(FichaCostoResumen) public readonly fichaCostoResumenRepository: Repository<FichaCostoResumen>,private contratoMarcoService: ContratoMarcoService,
  private monedaService: MonedaService,private FormasPagoService: FormasPagoService,private incotermService: IncotermService,
  private puertosService: PuertosService,private embalajesService: EmbalajesService,
  private proveedoresService: ProveedoresService,private paisesService: PaisesService,private codigosParaLaVentaService: CodigosParaLaVentaService,) {}


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
    const fichaCostoResumen = await this.findOne(id);
    return await this.fichaCostoResumenRepository.remove(fichaCostoResumen);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const fichaCostoResumen = await this.fichaCostoResumenRepository.findByIds(id);
    return await this.fichaCostoResumenRepository.remove(fichaCostoResumen);
  }

  async getCMarco (id: number) : Promise<ContratoMarco>{
    return this.contratoMarcoService.findOne(id);
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

  async getProveedor (Id: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(Id);
  }

  async getPais (Id: number) : Promise<Paises>{
    return this.paisesService.findOne(Id);
  }

  async getCodigo (Id: number) : Promise<CodigosParaLaVenta>{
    return this.codigosParaLaVentaService.findOne(Id);
  }
}
