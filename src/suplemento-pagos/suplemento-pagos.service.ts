import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { FormasPagoService } from 'src/formas-pago/formas-pago.service';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { SuplementoPagos } from 'src/models/entities/SuplementoPagos.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoPagoInput } from './dto/create-suplemento-pago.input';

@Injectable()
export class SuplementoPagosService {
  constructor(@InjectRepository(SuplementoPagos) public readonly suplementoPagosRepository: Repository<SuplementoPagos>,
  private suplementoResumenService: SuplementoResumenService,private embarquesService: EmbarquesService, private formasPagoService: FormasPagoService) {}


  async save(createSuplementoPagoInput: CreateSuplementoPagoInput) : Promise<SuplementoPagos> {
    return await this.suplementoPagosRepository.save(createSuplementoPagoInput);
  }

  async findAll(): Promise<SuplementoPagos[]> {
    return await this.suplementoPagosRepository.find();
  }

  async findOne(id: number) : Promise<SuplementoPagos> {
    return await this.suplementoPagosRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.suplementoPagosRepository.delete(id);
  }

  async getSuplementoResumen (id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(id);
  }

  async getEmbarque (id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(id);
  }

  async getFormaPago (id: number) : Promise<FormasPago>{
    return this.formasPagoService.findOne(id);
  }
}