import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { FormasPagoService } from 'src/formas-pago/formas-pago.service';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { Pagos } from 'src/models/entities/Pagos.entity';
import { PagosAPartirDe } from 'src/models/entities/PagosAPartirDe.entity';
import { PagosApartirDeService } from 'src/pagos-apartir-de/pagos-apartir-de.service';
import { Repository } from 'typeorm';
import { CreatePagoInput } from './dto/create-pago.input';

@Injectable()
export class PagosService {
  constructor(@InjectRepository(Pagos) public readonly pagosRepository: Repository<Pagos>, private embarquesService: EmbarquesService,
  private formasPagoService: FormasPagoService, private pagosAPartirDeService: PagosApartirDeService) {}

  async save(createPagosInput: CreatePagoInput) : Promise<Pagos> {
    return await this.pagosRepository.save(createPagosInput);
  }

  async findAll(): Promise<Pagos[]> {
    return await this.pagosRepository.find();
  }

  async findOne(id: number) : Promise<Pagos> {
    return await this.pagosRepository.findOne({where: {idPago: id},});
  }

  async remove(id: number) : Promise<any> {
    const puertos = await this.findOne(id);
    return await this.pagosRepository.remove(puertos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const puertos = await this.pagosRepository.findByIds(id);
    return await this.pagosRepository.remove(puertos);
  }

  async getEmbarque (Id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(Id);
  }

  async getFormaPago (Id: number) : Promise<FormasPago>{
    return this.formasPagoService.findOne(Id);
  }

  async getPagoAPartirDe (Id: number) : Promise<PagosAPartirDe>{
    return this.pagosAPartirDeService.findOne(Id);
  }
}
