import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuplementoDesglose } from 'src/models/entities/SuplementoDesglose.entity';
import { In, Repository } from 'typeorm';
import { CreateSuplementoDesgloseInput } from './dto/create-suplemento-desglose.input';

@Injectable()
export class SuplementoDesgloseService {
  constructor(@InjectRepository(SuplementoDesglose) public readonly suplementoDesgloseRepository: Repository<SuplementoDesglose>) {}


  async save(createSuplementoDesgloseInput: CreateSuplementoDesgloseInput) : Promise<SuplementoDesglose> {
    return await this.suplementoDesgloseRepository.save(createSuplementoDesgloseInput);
  }

  async findAll(): Promise<SuplementoDesglose[]> {
    return await this.suplementoDesgloseRepository.find({relations:['suplementoResumen','embalaje','codigo','referencia']});
  }

  async findOne(id: number) : Promise<SuplementoDesglose> {
    return await this.suplementoDesgloseRepository.findOne({where: {idSuplementoDesglose: id},relations:['suplementoResumen','embalaje','codigo','referencia']});
  }

  async remove(id: number) : Promise<any> {
    const suplementoDesglose = await this.findOne(id);
    return await this.suplementoDesgloseRepository.remove(suplementoDesglose);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoDesglose = await this.suplementoDesgloseRepository.findBy({
      idSuplementoDesglose: In(id)
  });
    return await this.suplementoDesgloseRepository.remove(suplementoDesglose);
  }

  async removeSeveralByEmbarqueIdSuplementoResumenId(idEmbarque: number, idSuplementoResumen: number) : Promise<any> {
    const suplementoDesgloses = await this.suplementoDesgloseRepository.find({where: {idEmbarque,idSuplementoResumen}});
    return await this.suplementoDesgloseRepository.remove(suplementoDesgloses);
  }
}
