import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { In, Repository } from 'typeorm';
import { CreatePuertoInput } from './dto/create-puerto.input';

@Injectable()
export class PuertosService {
  constructor(@InjectRepository(Puertos) public readonly puertoRepository: Repository<Puertos>) {}

  async save(createPuertoInput: CreatePuertoInput) : Promise<Puertos> {
    return await this.puertoRepository.save(createPuertoInput);
  }

  async findAll(): Promise<Puertos[]> {
    return await this.puertoRepository.find({relations:['pais']});
  }

  async findOne(id: number) : Promise<Puertos> {
    return await this.puertoRepository.findOne({where: {idPuerto: id},relations:['pais']});
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
}
