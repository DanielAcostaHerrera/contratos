import { TiposDeComprasService } from './../tipos-de-compras/tipos-de-compras.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Repository } from 'typeorm';
import { CreateNegociacionResumenInput } from './dto/create-negociacion-resumen.input';
import { MonedaService } from 'src/moneda/moneda.service';
import { GruposDeComprasService } from 'src/grupos-de-compras/grupos-de-compras.service';
import { TiposDeCompras } from 'src/models/entities/TiposDeCompras.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';

@Injectable()
export class NegociacionResumenService {
  constructor(@InjectRepository(NegociacionResumen) public readonly negociacionResumenRepository: Repository<NegociacionResumen>,
  private tiposDeComprasService: TiposDeComprasService,private monedaService: MonedaService,private gruposDeComprasService: GruposDeComprasService,
  private proveedoresService: ProveedoresService) {}


  async save(createNegociacionResumenInput: CreateNegociacionResumenInput) : Promise<NegociacionResumen> {
    return await this.negociacionResumenRepository.save(createNegociacionResumenInput);
  }

  async findAll(): Promise<NegociacionResumen[]> {
    return await this.negociacionResumenRepository.find({ relations: ['negociacionDetalle','negociacionDetalles','negociacionProveedores','fichaCompraResumen',
    'solicitudContratacion','contratos','facturaResumen']});
  }

  async findOne(id: number) : Promise<NegociacionResumen> {
    return await this.negociacionResumenRepository.findOne(id,{ relations: ['negociacionDetalle','negociacionDetalles','negociacionProveedores',
    'fichaCompraResumen','solicitudContratacion','contratos','facturaResumen']});
  }

  async remove(id: number) : Promise<any> {
    const negociacionResumen = await this.findOne(id);
    return await this.negociacionResumenRepository.remove(negociacionResumen);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const negociacionResumen = await this.negociacionResumenRepository.findByIds(id);
    return await this.negociacionResumenRepository.remove(negociacionResumen);
  }

  async getTipoCompra (tipoCompraId: number) : Promise<TiposDeCompras>{
    return this.tiposDeComprasService.findOne(tipoCompraId);
  }

  async getMoneda (monedaId: number) : Promise<Monedas>{
    return this.monedaService.findOne(monedaId);
  }

  async getGrupo (grupoId: number) : Promise<GruposDeCompras>{
    return this.gruposDeComprasService.findOne(grupoId);
  }

  async getProveedor (Id: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(Id);
  }
}
