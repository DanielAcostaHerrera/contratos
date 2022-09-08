import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagos } from 'src/models/entities/Pagos.entity';
import { In, Repository } from 'typeorm';
import { CreatePagoInput } from './dto/create-pago.input';

@Injectable()
export class PagosService {
  constructor(@InjectRepository(Pagos) public readonly pagosRepository: Repository<Pagos>) {}

  async save(createPagosInput: CreatePagoInput) : Promise<Pagos> {
    return await this.pagosRepository.save(createPagosInput);
  }

  async findAll(): Promise<Pagos[]> {
    return await this.pagosRepository.find({relations: ['embarques','formaPago','pagoAPartirDe']});
  }

  async findOne(id: number) : Promise<Pagos> {
    return await this.pagosRepository.findOne({where: {idPago: id},relations: ['embarques','formaPago','pagoAPartirDe']});
  }

  async remove(id: number) : Promise<any> {
    const pagos = await this.findOne(id);
    return await this.pagosRepository.remove(pagos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const pagos = await this.pagosRepository.findBy({
      idPago: In(id)
  });
    return await this.pagosRepository.remove(pagos);
  }
}
