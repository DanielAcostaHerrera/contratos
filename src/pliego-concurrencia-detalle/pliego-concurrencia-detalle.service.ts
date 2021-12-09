import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbalajesService } from 'src/embalajes/Embalajes.service';
import { Embalajes } from 'src/models/entities/Embalajes.entity';
import { PliegoConcurrenciaDetalle } from 'src/models/entities/PliegoConcurrenciaDetalle.entity';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { PliegoConcurrenciaResumenService } from 'src/pliego-concurrencia-resumen/pliego-concurrencia-resumen.service';
import { Repository } from 'typeorm';
import { CreatePliegoConcurrenciaDetalleInput } from './dto/create-pliego-concurrencia-detalle.input';

@Injectable()
export class PliegoConcurrenciaDetalleService {
  constructor(@InjectRepository(PliegoConcurrenciaDetalle) public readonly pliegoConcurrenciaDetalleRepository: Repository<PliegoConcurrenciaDetalle>,
  private pliegoConcurrenciaResumenService: PliegoConcurrenciaResumenService,private embalajesService: EmbalajesService) {}


  async save(createPliegoConcurrenciaDetalleInput: CreatePliegoConcurrenciaDetalleInput) : Promise<PliegoConcurrenciaDetalle> {
    return await this.pliegoConcurrenciaDetalleRepository.save(createPliegoConcurrenciaDetalleInput);
  }

  async findAll(): Promise<PliegoConcurrenciaDetalle[]> { 
    return await this.pliegoConcurrenciaDetalleRepository.find();
  }

  async findOne(id: number) : Promise<PliegoConcurrenciaDetalle> {
    return await this.pliegoConcurrenciaDetalleRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.pliegoConcurrenciaDetalleRepository.delete(id);
  }

  async getPliegoConcurrenciaResumen (pliegoConcurrenciaResumenId: number) : Promise<PliegoConcurrenciaResumen>{
    return this.pliegoConcurrenciaResumenService.findOne(pliegoConcurrenciaResumenId);
  }

  async getEmbalaje (embalajeId: number) : Promise<Embalajes>{
    return this.embalajesService.findOne(embalajeId);
  }
}
