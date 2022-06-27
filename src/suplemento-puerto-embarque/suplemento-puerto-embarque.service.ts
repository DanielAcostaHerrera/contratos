import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { SuplementoPuertoEmbarque } from 'src/models/entities/SuplementoPuertoEmbarque.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { PuertosService } from 'src/puertos/puertos.service';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoPuertoEmbarqueInput } from './dto/create-suplemento-puerto-embarque.input';

@Injectable()
export class SuplementoPuertoEmbarqueService {
  constructor(@InjectRepository(SuplementoPuertoEmbarque) public readonly suplementoPuertoEmbarqueRepository: Repository<SuplementoPuertoEmbarque>,
  private suplementoResumenService: SuplementoResumenService, private embarquesService: EmbarquesService, private puertosService: PuertosService) {}

  async save(createSuplementoPuertoEmbarqueInput: CreateSuplementoPuertoEmbarqueInput) : Promise<SuplementoPuertoEmbarque> {
    return await this.suplementoPuertoEmbarqueRepository.save(createSuplementoPuertoEmbarqueInput);
  }

  async findAll(): Promise<SuplementoPuertoEmbarque[]> {
    return await this.suplementoPuertoEmbarqueRepository.find();
  }

  async findOne(id: number) : Promise<SuplementoPuertoEmbarque> {
    return await this.suplementoPuertoEmbarqueRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const puertos = await this.findOne(id);
    return await this.suplementoPuertoEmbarqueRepository.remove(puertos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const puertos = await this.suplementoPuertoEmbarqueRepository.findByIds(id);
    return await this.suplementoPuertoEmbarqueRepository.remove(puertos);
  }

  async getSuplementoResumen (Id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(Id);
  }

  async getEmbarque (Id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(Id);
  }

  async getPuerto (Id: number) : Promise<Puertos>{
    return this.puertosService.findOne(Id);
  }

  async removeSeveralByEmbarqueIdSuplementoResumenId(idEmbarque: number, idSuplementoResumen: number) : Promise<any> {
    const suplementoDesgloses = await this.suplementoPuertoEmbarqueRepository.find({where: {idEmbarque,idSuplementoResumen}});
    return await this.suplementoPuertoEmbarqueRepository.remove(suplementoDesgloses);
  }
}
