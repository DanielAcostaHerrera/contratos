import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { FichaCompraResumenService } from 'src/ficha-compra-resumen/ficha-compra-resumen.service';
import { FichaCompraDetalle } from 'src/models/entities/FichaCompraDetalle.entity';
import { FichaCompraResumen } from 'src/models/entities/FichaCompraResumen.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { UnidadMedidaService } from 'src/unidad-medida/unidad-medida.service';
import { Repository } from 'typeorm';
import { CreateFichaCompraDetalleInput } from './dto/create-ficha-compra-detalle.input';

@Injectable()
export class FichaCompraDetalleService {
  constructor(@InjectRepository(FichaCompraDetalle) public readonly fichaCompraDetalleRepository: Repository<FichaCompraDetalle>,
  private fichaCompraResumenService: FichaCompraResumenService,private codigosParaLaVentaService: CodigosParaLaVentaService,
  private unidadMedidaService: UnidadMedidaService) {}


  async save(createFichaCompraDetalleInput: CreateFichaCompraDetalleInput) : Promise<FichaCompraDetalle> {
    return await this.fichaCompraDetalleRepository.save(createFichaCompraDetalleInput);
  }

  async findAll(): Promise<FichaCompraDetalle[]> { 
    return await this.fichaCompraDetalleRepository.find({relations:['fichaCompraAtributos']});
  }

  async findOne(id: number) : Promise<FichaCompraDetalle> {
    return await this.fichaCompraDetalleRepository.findOne(id,{relations:['fichaCompraAtributos']});
  }

  async remove(id: number) : Promise<any> {
    const fichaCompraDetalle = await this.findOne(id);
    return await this.fichaCompraDetalleRepository.remove(fichaCompraDetalle);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const fichaCompraDetalle = await this.fichaCompraDetalleRepository.findByIds(id);
    return await this.fichaCompraDetalleRepository.remove(fichaCompraDetalle);
  }

  async getFichaCompraResumen (fichaId: number) : Promise<FichaCompraResumen>{
    return this.fichaCompraResumenService.findOne(fichaId);
  }

  async getCodigo (Id: number) : Promise<CodigosParaLaVenta>{
    return this.codigosParaLaVentaService.findOne(Id);
  }

  async getUnidadMedida (Id: number) : Promise<UnidadMedida>{
    return this.unidadMedidaService.findOne(Id);
  }
}
