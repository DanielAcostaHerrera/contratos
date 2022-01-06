import { DetalleCircularesAltas } from './../modelsMercurio/entities/DetalleCircularesAltas.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DetalleCircularesAltasService {
  constructor(@InjectRepository(DetalleCircularesAltas) public readonly detallesCircularesAltasRepository: Repository<DetalleCircularesAltas>) {}

  async findAll(): Promise<DetalleCircularesAltas[]> {
    return await this.detallesCircularesAltasRepository.find();
  }

  async findOne(id: number) : Promise<DetalleCircularesAltas> {
    return await this.detallesCircularesAltasRepository.findOne(id);
  }
}
