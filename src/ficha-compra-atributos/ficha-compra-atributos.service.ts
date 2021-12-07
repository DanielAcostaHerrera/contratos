import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FichaCompraDetalleService } from 'src/ficha-compra-detalle/ficha-compra-detalle.service';
import { FichaCompraAtributos } from 'src/models/entities/FichaCompraAtributos.entity';
import { FichaCompraDetalle } from 'src/models/entities/FichaCompraDetalle.entity';
import { Repository } from 'typeorm';
import { CreateFichaCompraAtributoInput } from './dto/create-ficha-compra-atributo.input';

@Injectable()
export class FichaCompraAtributosService {
  constructor(@InjectRepository(FichaCompraAtributos) public readonly fichaCompraAtributosRepository: Repository<FichaCompraAtributos>,
  private fichaCompraDetalleService: FichaCompraDetalleService) {}


  async save(createFichaCompraAtributoInput: CreateFichaCompraAtributoInput) : Promise<FichaCompraAtributos> {
    return await this.fichaCompraAtributosRepository.save(createFichaCompraAtributoInput);
  }

  async findAll(): Promise<FichaCompraAtributos[]> { 
    return await this.fichaCompraAtributosRepository.find();
  }

  async findOne(id: number) : Promise<FichaCompraAtributos> {
    return await this.fichaCompraAtributosRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.fichaCompraAtributosRepository.delete(id);
  }

  async getFichaCompraDetalle (fichaDetalleId: number) : Promise<FichaCompraDetalle>{
    return this.fichaCompraDetalleService.findOne(fichaDetalleId);
  }
}
