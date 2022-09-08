import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { PaisesService } from 'src/paises/paises.service';
import { In, Repository } from 'typeorm';
import { CreatePuertoInput } from './dto/create-puerto.input';

@Injectable()
export class PuertosService {
  constructor(@InjectRepository(Puertos) public readonly puertoRepository: Repository<Puertos>,private paisesService: PaisesService,
  private logsService: LogsService) {}

  async save(createPuertoInput: CreatePuertoInput) : Promise<Puertos> {
    return await this.puertoRepository.save(createPuertoInput);
  }

  async findAll(): Promise<Puertos[]> {
    return await this.puertoRepository.find();
  }

  async findOne(id: number) : Promise<Puertos> {
    return await this.puertoRepository.findOne({where: {idPuerto: id},});
  }

  async remove(id: number) : Promise<any> {
    const puertos = await this.findOne(id);
    return await this.puertoRepository.remove(puertos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const puertos = await this.puertoRepository.findBy({
      idPuerto: In(id)
  });
    return await this.puertoRepository.remove(puertos);
  }

  async getPais (id: number) : Promise<Paises>{
    return this.paisesService.findOne(id);
  }
}
