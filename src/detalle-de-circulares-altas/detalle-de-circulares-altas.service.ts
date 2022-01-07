import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleDeCircularesAltas } from 'src/modelsMercurio/entities/DetalleDeCircularesAltas.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleDeCircularesAltasService {
  constructor(@InjectRepository(DetalleDeCircularesAltas) public readonly detalleDeCircularesAltasRepository: Repository<DetalleDeCircularesAltas>) {}

  async findAll(): Promise<DetalleDeCircularesAltas[]> {
    return await this.detalleDeCircularesAltasRepository.find({relations: ['contratoDesgloses']});
  }

  async findOne(id: number) : Promise<DetalleDeCircularesAltas> {
    return await this.detalleDeCircularesAltasRepository.findOne(id,{relations: ['contratoDesgloses']});
  }
}
