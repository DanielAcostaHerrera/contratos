import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbalajesService } from 'src/embalajes/Embalajes.service';
import { EspecificosService } from 'src/especificos/especificos.service';
import { Embalajes } from 'src/models/entities/Embalajes.entity';
import { PliegoConcurrenciaDetalle } from 'src/models/entities/PliegoConcurrenciaDetalle.entity';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { Especificos } from 'src/modelsMercurio/entities/Especificos.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { PliegoConcurrenciaResumenService } from 'src/pliego-concurrencia-resumen/pliego-concurrencia-resumen.service';
import { UnidadMedidaService } from 'src/unidad-medida/unidad-medida.service';
import { In, Repository } from 'typeorm';
import { CreatePliegoConcurrenciaDetalleInput } from './dto/create-pliego-concurrencia-detalle.input';

@Injectable()
export class PliegoConcurrenciaDetalleService {
  constructor(@InjectRepository(PliegoConcurrenciaDetalle) public readonly pliegoConcurrenciaDetalleRepository: Repository<PliegoConcurrenciaDetalle>,
  private pliegoConcurrenciaResumenService: PliegoConcurrenciaResumenService,private embalajesService: EmbalajesService,
  private unidadMedidaService: UnidadMedidaService,private especificosService: EspecificosService) {}


  async save(createPliegoConcurrenciaDetalleInput: CreatePliegoConcurrenciaDetalleInput) : Promise<PliegoConcurrenciaDetalle> {
    return await this.pliegoConcurrenciaDetalleRepository.save(createPliegoConcurrenciaDetalleInput);
  }

  async findAll(): Promise<PliegoConcurrenciaDetalle[]> { 
    return await this.pliegoConcurrenciaDetalleRepository.find();
  }

  async findOne(id: number) : Promise<PliegoConcurrenciaDetalle> {
    return await this.pliegoConcurrenciaDetalleRepository.findOne({where: {idPliegoDetalle: id},});
  }

  async remove(id: number) : Promise<any> {
    const pliegoConcurrenciaDetalle = await this.findOne(id);
    return await this.pliegoConcurrenciaDetalleRepository.remove(pliegoConcurrenciaDetalle);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const pliegoConcurrenciaDetalle = await this.pliegoConcurrenciaDetalleRepository.findBy({
      idPliegoDetalle: In(id)
  });
    return await this.pliegoConcurrenciaDetalleRepository.remove(pliegoConcurrenciaDetalle);
  }

  async getPliegoConcurrenciaResumen (pliegoConcurrenciaResumenId: number) : Promise<PliegoConcurrenciaResumen>{
    return this.pliegoConcurrenciaResumenService.findOne(pliegoConcurrenciaResumenId);
  }

  async getEmbalaje (embalajeId: number) : Promise<Embalajes>{
    return this.embalajesService.findOne(embalajeId);
  }

  async getUnidadMedida (Id: number) : Promise<UnidadMedida>{
    return this.unidadMedidaService.findOne(Id);
  }

  async getEspecifico (Id: number) : Promise<Especificos>{
    return this.especificosService.findOne(Id);
  }
}
