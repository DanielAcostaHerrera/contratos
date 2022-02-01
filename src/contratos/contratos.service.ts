import { CompaniasNavieras } from './../modelsNomgen/entities/CompaniasNavieras.entity';
import { AgenciasAseguradoras } from './../modelsNomgen/entities/AgenciasAseguradoras.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgenciasAseguradorasService } from 'src/agencias-aseguradoras/agencias-aseguradoras.service';
import { BasesCmarcoService } from 'src/bases-cmarco/bases-cmarco.service';
import { BasesGeneralesService } from 'src/bases-generales/bases-generales.service';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { FichaCostoResumenService } from 'src/ficha-costo-resumen/ficha-costo-resumen.service';
import { FormasEntregaService } from 'src/formas-entrega/formas-entrega.service';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { FichaCostoResumen } from 'src/models/entities/FichaCostoResumen.entity';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { MonedaService } from 'src/moneda/moneda.service';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { PaisesService } from 'src/paises/paises.service';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { Repository } from 'typeorm';
import { CreateContratoInput } from './dto/create-contrato.input';

@Injectable()
export class ContratosService {
  constructor(@InjectRepository(Contratos) public readonly contratoRepository: Repository<Contratos>,private companiasNavierasService: CompaniasNavierasService,
  private basesGeneralesService: BasesGeneralesService,private basesCmarcoService: BasesCmarcoService,private monedaService: MonedaService,
  private formasEntregaService: FormasEntregaService,private negociacionResumenService: NegociacionResumenService,
  private fichaCostoResumenService: FichaCostoResumenService,private ejecutivoService: EjecutivoService,
  private paisesService: PaisesService,private proveedoresService: ProveedoresService,
  private agenciasAseguradorasService: AgenciasAseguradorasService) {}


  async save(createContratoInput: CreateContratoInput) : Promise<Contratos> {
    return await this.contratoRepository.save(createContratoInput);
  }

  async findAll(): Promise<Contratos[]> {
    return await this.contratoRepository.find({relations:['contratoClausulas','documentacionContratos','embarques','facturaResumen','fichaCompraResumen',
    'suplementoEmbarques','suplementoResumen']});
  }

  async findOne(id: number) : Promise<Contratos> {
    return await this.contratoRepository.findOne(id,{relations:['contratoClausulas','documentacionContratos','embarques','facturaResumen','fichaCompraResumen',
    'suplementoEmbarques','suplementoResumen']});
  }

  async remove(id: number) : Promise<any> {
    const contratos = await this.findOne(id);
    return await this.contratoRepository.remove(contratos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const contratos = await this.contratoRepository.findByIds(id);
    return await this.contratoRepository.remove(contratos);
  }

  async getBasesGenerales (Id: number) : Promise<BasesGenerales>{
    return this.basesGeneralesService.findOne(Id);
  }

  async getBasesCMarco (Id: number) : Promise<BasesCMarco>{
    return this.basesCmarcoService.findOne(Id);
  }

  async getMoneda (Id: number) : Promise<Monedas>{
    return this.monedaService.findOne(Id);
  }

  async getFormaEntrega (Id: number) : Promise<FormasEntrega>{
    return this.formasEntregaService.findOne(Id);
  }

  async getNegociacionResumen (Id: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(Id);
  }

  async getFichaCostoResumen (Id: number) : Promise<FichaCostoResumen>{
    return this.fichaCostoResumenService.findOne(Id);
  }

  async getEjecutivoRealiza (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getEjecutivoFirma (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getEjecutivoModifica (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getPais (Id: number) : Promise<Paises>{
    return this.paisesService.findOne(Id);
  }

  async getProveedor (Id: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(Id);
  }

  async getEmpresaAseguradora (Id: number) : Promise<AgenciasAseguradoras>{
    return this.agenciasAseguradorasService.findOne(Id);
  }

  async getEmpresaNaviera (Id: number) : Promise<CompaniasNavieras>{
    return this.companiasNavierasService.findOne(Id);
  }
}
