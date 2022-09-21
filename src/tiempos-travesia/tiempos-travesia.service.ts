import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiemposTravesia } from 'src/models/entities/TiemposTravesia.entity';
import { In, Repository } from 'typeorm';
import { CreateTiemposTravesiaInput } from './dto/create-tiempos-travesia.input';

@Injectable()
export class TiemposTravesiaService {
  constructor(@InjectRepository(TiemposTravesia) public readonly tiemposTravesiaRepository: Repository<TiemposTravesia>) {}


  async save(createTiemposTravesiaInput: CreateTiemposTravesiaInput) : Promise<TiemposTravesia> {
    return await this.tiemposTravesiaRepository.save(createTiemposTravesiaInput);
  }

  async findAll(): Promise<TiemposTravesia[]> { 
    return await this.tiemposTravesiaRepository.find({relations:['etapaContratacion','pais']});
  }

  async findOne(id: number) : Promise<TiemposTravesia> {
    return await this.tiemposTravesiaRepository.findOne({where: {idTiemposTravesia: id},relations:['etapaContratacion','pais']});
  }

  async remove(id: number) : Promise<any> {
    const tiemposTravesia = await this.findOne(id);
    return await this.tiemposTravesiaRepository.remove(tiemposTravesia);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const tiemposTravesia = await this.tiemposTravesiaRepository.findBy({
      idTiemposTravesia: In(id)
  });
    return await this.tiemposTravesiaRepository.remove(tiemposTravesia);
  }
}
