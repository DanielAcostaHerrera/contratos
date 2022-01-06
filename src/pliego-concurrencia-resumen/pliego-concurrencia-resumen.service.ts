import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { FormasEntregaService } from 'src/formas-entrega/formas-entrega.service';
import { FormasPagoService } from 'src/formas-pago/formas-pago.service';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { PliegoConcurrencia } from 'src/models/entities/PliegoConcurrencia.entity';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { TiposContenedor } from 'src/models/entities/TiposContenedor.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { MonedaService } from 'src/moneda/moneda.service';
import { PaisesService } from 'src/paises/paises.service';
import { PliegoConcurrenciaService } from 'src/pliego-concurrencia/pliego-concurrencia.service';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { PuertosService } from 'src/puertos/puertos.service';
import { TiposContenedorService } from 'src/tipos-contenedor/tipos-contenedor.service';
import { Repository } from 'typeorm';
import { CreatePliegoConcurrenciaResumanInput } from './dto/create-pliego-concurrencia-resuman.input';

@Injectable()
export class PliegoConcurrenciaResumenService {
  constructor(@InjectRepository(PliegoConcurrenciaResumen) public readonly pliegoConcurrenciaResumenRepository: Repository<PliegoConcurrenciaResumen>,
  private pliegoConcurrenciaService: PliegoConcurrenciaService,private monedaOfertaService: MonedaService,
  private monedaPagoService: MonedaService,private monedaCartaCreditoService: MonedaService,
  private incotermService: IncotermService,private formasPagoService: FormasPagoService,
  private formasEntregaService: FormasEntregaService,private puertosEmbarqueService: PuertosService,
  private puertosDestinoService: PuertosService,private tiposContenedorService: TiposContenedorService,
  private proveedoresService: ProveedoresService,private paisesService: PaisesService,
  private companiasNavierasService: CompaniasNavierasService) {}


  async save(createPliegoConcurrenciaResumanInput: CreatePliegoConcurrenciaResumanInput) : Promise<PliegoConcurrenciaResumen> {
    return await this.pliegoConcurrenciaResumenRepository.save(createPliegoConcurrenciaResumanInput);
  }

  async findAll(): Promise<PliegoConcurrenciaResumen[]> { 
    return await this.pliegoConcurrenciaResumenRepository.find({relations:['pliegoConcurrenciaDetalles','solicitudCodificacion']});
  }

  async findOne(id: number) : Promise<PliegoConcurrenciaResumen> {
    return await this.pliegoConcurrenciaResumenRepository.findOne(id,{relations:['pliegoConcurrenciaDetalles','solicitudCodificacion']});
  }

  async remove(id: number) : Promise<any> {
    const pliegoConcurrenciaResumen = await this.findOne(id);
    return await this.pliegoConcurrenciaResumenRepository.remove(pliegoConcurrenciaResumen);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const pliegoConcurrenciaResumen = await this.pliegoConcurrenciaResumenRepository.findByIds(id);
    return await this.pliegoConcurrenciaResumenRepository.remove(pliegoConcurrenciaResumen);
  }

  async getPliegoConcurrencia (id: number) : Promise<PliegoConcurrencia>{
    return this.pliegoConcurrenciaService.findOne(id);
  }

  async getMonedaOferta (id: number) : Promise<Monedas>{
    return this.monedaOfertaService.findOne(id);
  }

  async getMonedaPago (id: number) : Promise<Monedas>{
    return this.monedaPagoService.findOne(id);
  }

  async getMonedaCartaCredito (id: number) : Promise<Monedas>{
    return this.monedaCartaCreditoService.findOne(id);
  }

  async getIncoterm (id: number) : Promise<Incoterm>{
    return this.incotermService.findOne(id);
  }

  async getFormasPago (id: number) : Promise<FormasPago>{
    return this.formasPagoService.findOne(id);
  }

  async getFormasEntrega (id: number) : Promise<FormasEntrega>{
    return this.formasEntregaService.findOne(id);
  }

  async getPuertosEmbarque (id: number) : Promise<Puertos>{
    return this.puertosEmbarqueService.findOne(id);
  }

  async getPuertosDestino (id: number) : Promise<Puertos>{
    return this.puertosDestinoService.findOne(id);
  }

  async getTiposContenedor (id: number) : Promise<TiposContenedor>{
    return this.tiposContenedorService.findOne(id);
  }

  async getProveedor (id: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(id);
  }

  async getPais (id: number) : Promise<Paises>{
    return this.paisesService.findOne(id);
  }

  async getEmpresaNaviera (id: number) : Promise<CompaniasNavieras>{
    return this.companiasNavierasService.findOne(id);
  }
}
