import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { Repository } from 'typeorm';
import { CreateFormasPagoInput } from './dto/create-formas-pago.input';

@Injectable()
export class FormasPagoService {
  constructor(@InjectRepository(FormasPago) public readonly formasPagoRepository: Repository<FormasPago>) {}


  async save(createFormasPagoInput: CreateFormasPagoInput) : Promise<FormasPago> {
    return await this.formasPagoRepository.save(createFormasPagoInput);
  }

  async findAll(): Promise<FormasPago[]> { 
    return await this.formasPagoRepository.find({relations:['fichaCostoResumen','pliegoConcurrenciaResumen']});
  }

  async findOne(id: number) : Promise<FormasPago> {
    return await this.formasPagoRepository.findOne(id,{relations:['fichaCostoResumen','pliegoConcurrenciaResumen']});
  }

  async remove(id: number) : Promise<any> {
    return await this.formasPagoRepository.delete(id);
  }
}