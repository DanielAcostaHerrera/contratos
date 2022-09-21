import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PliegoConcurrenciaDetalle } from 'src/models/entities/PliegoConcurrenciaDetalle.entity';
import { In, Repository } from 'typeorm';
import { CreatePliegoConcurrenciaDetalleInput } from './dto/create-pliego-concurrencia-detalle.input';

@Injectable()
export class PliegoConcurrenciaDetalleService {
  constructor(@InjectRepository(PliegoConcurrenciaDetalle) public readonly pliegoConcurrenciaDetalleRepository: Repository<PliegoConcurrenciaDetalle>) {}


  async save(createPliegoConcurrenciaDetalleInput: CreatePliegoConcurrenciaDetalleInput) : Promise<PliegoConcurrenciaDetalle> {
    return await this.pliegoConcurrenciaDetalleRepository.save(createPliegoConcurrenciaDetalleInput);
  }

  async findAll(): Promise<PliegoConcurrenciaDetalle[]> { 
    return await this.pliegoConcurrenciaDetalleRepository.find({relations:['pliegoResumen','embalaje','unidadMedida','especifico']});
  }

  async findOne(id: number) : Promise<PliegoConcurrenciaDetalle> {
    return await this.pliegoConcurrenciaDetalleRepository.findOne({where: {idPliegoDetalle: id},relations:['pliegoResumen','embalaje','unidadMedida','especifico']});
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
}
