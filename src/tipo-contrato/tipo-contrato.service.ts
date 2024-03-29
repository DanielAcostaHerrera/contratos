import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { In, Repository } from 'typeorm';
import { CreateTipoContratoInput } from './dto/create-tipo-contrato.input';

@Injectable()
export class TipoContratoService {
  constructor(@InjectRepository(TipoContrato) public readonly tipoContratoRepository: Repository<TipoContrato>) {}


  async save(createTipoContratoInput: CreateTipoContratoInput) : Promise<TipoContrato> {
    return await this.tipoContratoRepository.save(createTipoContratoInput);
  }

  async findAll(): Promise<TipoContrato[]> {
    return await this.tipoContratoRepository.find();
  }

  async findOne(id: number) : Promise<TipoContrato> {
    return await this.tipoContratoRepository.findOne({where: {idTipoContrato: id},});
  }

  async remove(id: number) : Promise<any> {
    const tipoContrato = await this.findOne(id);
    return await this.tipoContratoRepository.remove(tipoContrato);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const tipoContrato = await this.tipoContratoRepository.findBy({
      idTipoContrato: In(id)
  });
    return await this.tipoContratoRepository.remove(tipoContrato);
  }
}
