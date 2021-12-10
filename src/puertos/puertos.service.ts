import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Repository } from 'typeorm';
import { CreatePuertoInput } from './dto/create-puerto.input';

@Injectable()
export class PuertosService {
  constructor(@InjectRepository(Puertos) public readonly puertoRepository: Repository<Puertos>) {}


  async save(createPuertoInput: CreatePuertoInput) : Promise<Puertos> {
    return await this.puertoRepository.save(createPuertoInput);
  }

  async findAll(): Promise<Puertos[]> {
    return await this.puertoRepository.find({ relations: ['basesCMarco','fichaCostoResumen','pliegoConcurrenciaResumenEmbarque','pliegoConcurrenciaResumenDestino',
    'contratosOrigen','contratosDestino','facturaResumen','suplementoEmbarques','suplementoResumenOrigen','suplementoResumenDestino']});
  }

  async findOne(id: number) : Promise<Puertos> {
    return await this.puertoRepository.findOne(id,{ relations: ['basesCMarco','fichaCostoResumen','pliegoConcurrenciaResumenEmbarque','pliegoConcurrenciaResumenDestino',
    'contratosOrigen','contratosDestino','facturaResumen','suplementoEmbarques','suplementoResumenOrigen','suplementoResumenDestino']});
  }

  async remove(id: number) : Promise<any> {
    return await this.puertoRepository.delete(id);
  }
}
