import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PuertoEmbarque } from 'src/models/entities/PuertoEmbarque.entity';
import { In, Repository } from 'typeorm';
import { CreatePuertoEmbarqueInput } from './dto/create-puerto-embarque.input';

@Injectable()
export class PuertoEmbarqueService {
  constructor(@InjectRepository(PuertoEmbarque) public readonly puertoEmbarqueRepository: Repository<PuertoEmbarque>) {}

  async save(createPuertoEmbarqueInput: CreatePuertoEmbarqueInput) : Promise<PuertoEmbarque> {
    return await this.puertoEmbarqueRepository.save(createPuertoEmbarqueInput);
  }

  async findAll(): Promise<PuertoEmbarque[]> {
    return await this.puertoEmbarqueRepository.find({relations:['puertoOrigen','puertoDestino','embarques']});
  }

  async findOne(id: number) : Promise<PuertoEmbarque> {
    return await this.puertoEmbarqueRepository.findOne({where: {idPuertoEmbarque: id},relations:['puertoOrigen','puertoDestino','embarques']});
  }

  async remove(id: number) : Promise<any> {
    const puertoEmbarques = await this.findOne(id);
    return await this.puertoEmbarqueRepository.remove(puertoEmbarques);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const puertoEmbarques = await this.puertoEmbarqueRepository.findBy({
      idPuertoEmbarque: In(id)
  });
    return await this.puertoEmbarqueRepository.remove(puertoEmbarques);
  }

  async removeSeveralByEmbarqueId(idEmbarque: number) : Promise<any> {
    const puertoEmbarques = await this.puertoEmbarqueRepository.find({where: {idEmbarque}});
    return await this.puertoEmbarqueRepository.remove(puertoEmbarques);
  }
}
