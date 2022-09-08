import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtapasContratacionService } from 'src/etapas-contratacion/etapas-contratacion.service';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';
import { TiemposTravesia } from 'src/models/entities/TiemposTravesia.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { PaisesService } from 'src/paises/paises.service';
import { In, Repository } from 'typeorm';
import { CreateTiemposTravesiaInput } from './dto/create-tiempos-travesia.input';

@Injectable()
export class TiemposTravesiaService {
  constructor(@InjectRepository(TiemposTravesia) public readonly tiemposTravesiaRepository: Repository<TiemposTravesia>, 
  private etapasContratacionService: EtapasContratacionService,private paisesService: PaisesService) {}


  async save(createTiemposTravesiaInput: CreateTiemposTravesiaInput) : Promise<TiemposTravesia> {
    return await this.tiemposTravesiaRepository.save(createTiemposTravesiaInput);
  }

  async findAll(): Promise<TiemposTravesia[]> { 
    return await this.tiemposTravesiaRepository.find();
  }

  async findOne(id: number) : Promise<TiemposTravesia> {
    return await this.tiemposTravesiaRepository.findOne({where: {idTiemposTravesia: id},});
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

  async getEtapasContratacion (etapaId: number) : Promise<EtapasContratacion>{
    return this.etapasContratacionService.findOne(etapaId);
  }

  async getPais (Id: number) : Promise<Paises>{
    return this.paisesService.findOne(Id);
  }
}
