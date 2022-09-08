import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { In } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CodigosParaLaVentaService {
  constructor(@InjectRepository(CodigosParaLaVenta) public readonly codigosParaLaVentaRepository: Repository<CodigosParaLaVenta>) {}

  async findAll(): Promise<CodigosParaLaVenta[]> {
    return await this.codigosParaLaVentaRepository.find();
  }

  async findOne(id: number) : Promise<CodigosParaLaVenta> {
    return await this.codigosParaLaVentaRepository.findOne({where: {idCodigo: id},});
  }

  async findByListaCodigos(id: number[]) : Promise<CodigosParaLaVenta[]> {
    return await this.codigosParaLaVentaRepository.findBy({
      idCodigo: In(id)
  });
  }
}
