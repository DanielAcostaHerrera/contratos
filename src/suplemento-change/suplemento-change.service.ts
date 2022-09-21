
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuplementoChange } from 'src/models/entities/SuplementoChange.entity';
import { In, Repository } from 'typeorm';
import { CreateSuplementoChangeInput } from './dto/create-suplemento-change.input';

@Injectable()
export class SuplementoChangeService {
  constructor(@InjectRepository(SuplementoChange) public readonly suplementoChangeRepository: Repository<SuplementoChange>) {}


  async save(createSuplementoChangeInput: CreateSuplementoChangeInput) : Promise<SuplementoChange> {
    return await this.suplementoChangeRepository.save(createSuplementoChangeInput);
  }

  async findAll(): Promise<SuplementoChange[]> {
    return await this.suplementoChangeRepository.find({relations:['suplementoResumen','cambiosSuplementos']});
  }

  async findOne(id: number) : Promise<SuplementoChange> {
    return await this.suplementoChangeRepository.findOne({where: {idClausulaChange: id},relations:['suplementoResumen','cambiosSuplementos']});
  }

  async remove(id: number) : Promise<any> {
    const suplementoChange = await this.findOne(id);
    return await this.suplementoChangeRepository.remove(suplementoChange);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoChange = await this.suplementoChangeRepository.findBy({
      idClausulaChange: In(id)
  });
    return await this.suplementoChangeRepository.remove(suplementoChange);
  }

  async removeSeveralBySuplementoResumenId(idSuplementoResumen: number) : Promise<any> {
    const suplementoResumen = await this.suplementoChangeRepository.find({where: {idSuplementoResumen}});
    return await this.suplementoChangeRepository.remove(suplementoResumen);
  }
}
