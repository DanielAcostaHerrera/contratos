import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FichaCompraResumenService } from 'src/ficha-compra-resumen/ficha-compra-resumen.service';
import { FichaCompraDetalle } from 'src/models/entities/FichaCompraDetalle.entity';
import { FichaCompraResumen } from 'src/models/entities/FichaCompraResumen.entity';
import { Repository } from 'typeorm';
import { CreateFichaCompraDetalleInput } from './dto/create-ficha-compra-detalle.input';

@Injectable()
export class FichaCompraDetalleService {
  constructor(@InjectRepository(FichaCompraDetalle) public readonly fichaCompraDetalleRepository: Repository<FichaCompraDetalle>,
  private fichaCompraResumenService: FichaCompraResumenService) {}


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
    return await this.fichaCompraDetalleRepository.delete(id);
  }

  async getFichaCompraResumen (fichaId: number) : Promise<FichaCompraResumen>{
    return this.fichaCompraResumenService.findOne(fichaId);
  }
}
