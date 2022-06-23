import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { PuertoEmbarque } from 'src/models/entities/PuertoEmbarque.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { PuertosService } from 'src/puertos/puertos.service';
import { Repository } from 'typeorm';
import { CreatePuertoEmbarqueInput } from './dto/create-puerto-embarque.input';

@Injectable()
export class PuertoEmbarqueService {
  constructor(@InjectRepository(PuertoEmbarque) public readonly puertoEmbarqueRepository: Repository<PuertoEmbarque>,
  private puertosService: PuertosService, private embarquesService: EmbarquesService) {}

  async save(createPuertoEmbarqueInput: CreatePuertoEmbarqueInput) : Promise<PuertoEmbarque> {
    return await this.puertoEmbarqueRepository.save(createPuertoEmbarqueInput);
  }

  async findAll(): Promise<PuertoEmbarque[]> {
    return await this.puertoEmbarqueRepository.find();
  }

  async findOne(id: number) : Promise<PuertoEmbarque> {
    return await this.puertoEmbarqueRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const proformas = await this.findOne(id);
    return await this.puertoEmbarqueRepository.remove(proformas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const proformas = await this.puertoEmbarqueRepository.findByIds(id);
    return await this.puertoEmbarqueRepository.remove(proformas);
  }

  async getEmbarque (id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(id);
  }

  async getPuertoDestino (id: number) : Promise<Puertos>{
    return this.puertosService.findOne(id);
  }

  async getPuertoOrigen (id: number) : Promise<Puertos>{
    return this.puertosService.findOne(id);
  }

  async removeSeveralByEmbarqueId(idEmbarque: number) : Promise<any> {
    const puertoEmbarques = await this.puertoEmbarqueRepository.find({where: {idEmbarque}});
    return await this.puertoEmbarqueRepository.remove(puertoEmbarques);
  }
}
