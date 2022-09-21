import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuplementoPagos } from 'src/models/entities/SuplementoPagos.entity';
import { In, Repository } from 'typeorm';
import { CreateSuplementoPagoInput } from './dto/create-suplemento-pago.input';

@Injectable()
export class SuplementoPagosService {
  constructor(@InjectRepository(SuplementoPagos) public readonly suplementoPagosRepository: Repository<SuplementoPagos>) {}


  async save(createSuplementoPagoInput: CreateSuplementoPagoInput) : Promise<SuplementoPagos> {
    return await this.suplementoPagosRepository.save(createSuplementoPagoInput);
  }

  async findAll(): Promise<SuplementoPagos[]> {
    return await this.suplementoPagosRepository.find({relations:['suplementoResumen','embarques','formasPago']});
  }

  async findOne(id: number) : Promise<SuplementoPagos> {
    return await this.suplementoPagosRepository.findOne({where: {idSuplementoPagos: id},relations:['suplementoResumen','embarques','formasPago']});
  }

  async remove(id: number) : Promise<any> {
    const suplementoPagos = await this.findOne(id);
    return await this.suplementoPagosRepository.remove(suplementoPagos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoPagos = await this.suplementoPagosRepository.findBy({
      idSuplementoPagos: In(id)
  });
    return await this.suplementoPagosRepository.remove(suplementoPagos);
  }

  async removeSeveralByEmbarqueIdSuplementoResumenId(idEmbarque: number, idSuplementoResumen: number) : Promise<any> {
    const suplementoDesgloses = await this.suplementoPagosRepository.find({where: {idEmbarque,idSuplementoResumen}});
    return await this.suplementoPagosRepository.remove(suplementoDesgloses);
  }
}