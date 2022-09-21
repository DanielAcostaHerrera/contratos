import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuplementoPuertoEmbarque } from 'src/models/entities/SuplementoPuertoEmbarque.entity';
import { In, Repository } from 'typeorm';
import { CreateSuplementoPuertoEmbarqueInput } from './dto/create-suplemento-puerto-embarque.input';

@Injectable()
export class SuplementoPuertoEmbarqueService {
  constructor(@InjectRepository(SuplementoPuertoEmbarque) public readonly suplementoPuertoEmbarqueRepository: Repository<SuplementoPuertoEmbarque>) {}

  async save(createSuplementoPuertoEmbarqueInput: CreateSuplementoPuertoEmbarqueInput) : Promise<SuplementoPuertoEmbarque> {
    return await this.suplementoPuertoEmbarqueRepository.save(createSuplementoPuertoEmbarqueInput);
  }

  async findAll(): Promise<SuplementoPuertoEmbarque[]> {
    return await this.suplementoPuertoEmbarqueRepository.find({relations:['suplementoResumen','embarque','puertoOrigen','puertoDestino']});
  }

  async findOne(id: number) : Promise<SuplementoPuertoEmbarque> {
    return await this.suplementoPuertoEmbarqueRepository.findOne({where: {idSuplementoPuertoEmbarque: id},relations:['suplementoResumen','embarque','puertoOrigen','puertoDestino']});
  }

  async remove(id: number) : Promise<any> {
    const suplementoPuertoEmbarque = await this.findOne(id);
    return await this.suplementoPuertoEmbarqueRepository.remove(suplementoPuertoEmbarque);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoPuertoEmbarque = await this.suplementoPuertoEmbarqueRepository.findBy({
      idSuplementoPuertoEmbarque: In(id)
  });
    return await this.suplementoPuertoEmbarqueRepository.remove(suplementoPuertoEmbarque);
  }

  async removeSeveralByEmbarqueIdSuplementoResumenId(idEmbarque: number, idSuplementoResumen: number) : Promise<any> {
    const suplementoDesgloses = await this.suplementoPuertoEmbarqueRepository.find({where: {idEmbarque,idSuplementoResumen}});
    return await this.suplementoPuertoEmbarqueRepository.remove(suplementoDesgloses);
  }
}
