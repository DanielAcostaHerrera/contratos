import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { In, Repository } from 'typeorm';
import { CreateFormasPagoInput } from './dto/create-formas-pago.input';

@Injectable()
export class FormasPagoService {
  constructor(@InjectRepository(FormasPago) public readonly formasPagoRepository: Repository<FormasPago>) {}


  async save(createFormasPagoInput: CreateFormasPagoInput) : Promise<FormasPago> {
    return await this.formasPagoRepository.save(createFormasPagoInput);
  }

  async findAll(): Promise<FormasPago[]> { 
    return await this.formasPagoRepository.find();
  }

  async findOne(id: number) : Promise<FormasPago> {
    return await this.formasPagoRepository.findOne({where: {idFormaPago: id},});
  }

  async remove(id: number) : Promise<any> {
    const formasPago = await this.findOne(id);
    return await this.formasPagoRepository.remove(formasPago);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const formasPago = await this.formasPagoRepository.findBy({
      idFormaPago: In(id)
  });
    return await this.formasPagoRepository.remove(formasPago);
  }
}
