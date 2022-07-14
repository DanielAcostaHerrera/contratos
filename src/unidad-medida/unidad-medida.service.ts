import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnidadMedidaService {
  constructor(@InjectRepository(UnidadMedida) public readonly unidadMedidaRepository: Repository<UnidadMedida>) {}

  async findAll(): Promise<UnidadMedida[]> {
    return await this.unidadMedidaRepository.find();
  }

  async findOne(id: number) : Promise<UnidadMedida> {
    return await this.unidadMedidaRepository.findOne(id);
  }
}
