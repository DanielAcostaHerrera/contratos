import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campanas } from 'src/models/entities/Campanas.entity';
import { Repository } from 'typeorm';
import { CreateCampanaInput } from './dto/create-campana.input';

@Injectable()
export class CampanasService {
  constructor(@InjectRepository(Campanas) public readonly campanaRepository: Repository<Campanas>) {}


  async save(createCampanaInput: CreateCampanaInput) : Promise<Campanas> {
    return await this.campanaRepository.save(createCampanaInput);
  }

  async findAll(): Promise<Campanas[]> { 
    return await this.campanaRepository.find({relations:['campanaEtapasContratacion']});
  }

  async findOne(id: number) : Promise<Campanas> {
    return await this.campanaRepository.findOne(id,{relations:['campanaEtapasContratacion']});
  }

  async remove(id: number) : Promise<any> {
    const campanas = await this.findOne(id);
    return await this.campanaRepository.remove(campanas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const campanas = await this.campanaRepository.findByIds(id);
    return await this.campanaRepository.remove(campanas);
  }
}
