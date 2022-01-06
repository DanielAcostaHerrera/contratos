import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampanasService } from 'src/campanas/campanas.service';
import { EtapasContratacionService } from 'src/etapas-contratacion/etapas-contratacion.service';
import { CampanaEtapasContratacion } from 'src/models/entities/CampanaEtapasContratacion.entity';
import { Campanas } from 'src/models/entities/Campanas.entity';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { PaisesService } from 'src/paises/paises.service';
import { Repository } from 'typeorm';
import { CreateCampanaEtapasContratacionInput } from './dto/create-campana-etapas-contratacion.input';

@Injectable()
export class CampanaEtapasContratacionService {
  constructor(@InjectRepository(CampanaEtapasContratacion) public readonly campanaEtapasContratacionRepository: Repository<CampanaEtapasContratacion>,
  private campanasService: CampanasService, private etapasContratacionService: EtapasContratacionService,private paisesService: PaisesService) {}


  async save(createCampanaEtapasContratacionInput: CreateCampanaEtapasContratacionInput) : Promise<CampanaEtapasContratacion> {
    return await this.campanaEtapasContratacionRepository.save(createCampanaEtapasContratacionInput);
  }

  async findAll(): Promise<CampanaEtapasContratacion[]> { 
    return await this.campanaEtapasContratacionRepository.find();
  }

  async findOne(id: number) : Promise<CampanaEtapasContratacion> {
    return await this.campanaEtapasContratacionRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const campanaEtapasContratacion = await this.findOne(id);
    return await this.campanaEtapasContratacionRepository.remove(campanaEtapasContratacion);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const campanaEtapasContratacion = await this.campanaEtapasContratacionRepository.findByIds(id);
    return await this.campanaEtapasContratacionRepository.remove(campanaEtapasContratacion);
  }

  async getCampana (campanaId: number) : Promise<Campanas>{
    return this.campanasService.findOne(campanaId);
  }

  async getEtapaContratacion (etapaContratacionId: number) : Promise<EtapasContratacion>{
    return this.etapasContratacionService.findOne(etapaContratacionId);
  }

  async getPais (paisId: number) : Promise<Paises>{
    return this.paisesService.findOne(paisId);
  }
}
