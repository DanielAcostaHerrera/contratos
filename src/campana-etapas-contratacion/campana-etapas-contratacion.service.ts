import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampanaEtapasContratacion } from 'src/models/entities/CampanaEtapasContratacion.entity';
import { In, Repository } from 'typeorm';
import { CreateCampanaEtapasContratacionInput } from './dto/create-campana-etapas-contratacion.input';

@Injectable()
export class CampanaEtapasContratacionService {
  constructor(@InjectRepository(CampanaEtapasContratacion) public readonly campanaEtapasContratacionRepository: Repository<CampanaEtapasContratacion>) {}


  async save(createCampanaEtapasContratacionInput: CreateCampanaEtapasContratacionInput) : Promise<CampanaEtapasContratacion> {
    return await this.campanaEtapasContratacionRepository.save(createCampanaEtapasContratacionInput);
  }

  async findAll(): Promise<CampanaEtapasContratacion[]> { 
    return await this.campanaEtapasContratacionRepository.find({relations:['campana','etapaContratacion','pais']});
  }

  async findOne(id: number) : Promise<CampanaEtapasContratacion> {
    return await this.campanaEtapasContratacionRepository.findOne({where: {idCampanaEtapas: id},relations:['campana','etapaContratacion','pais']});
  }

  async remove(id: number) : Promise<any> {
    const campanaEtapasContratacion = await this.findOne(id);
    return await this.campanaEtapasContratacionRepository.remove(campanaEtapasContratacion);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const campanaEtapasContratacion = await this.campanaEtapasContratacionRepository.findBy({
      idCampanaEtapas: In(id)
  });
    return await this.campanaEtapasContratacionRepository.remove(campanaEtapasContratacion);
  }
}
