import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { Repository } from 'typeorm';
import { CreateEmbarqueInput } from './dto/create-embarque.input';

@Injectable()
export class EmbarquesService {
  constructor(@InjectRepository(Embarques) public readonly embarquesRepository: Repository<Embarques>,
  private companiasNavierasService: CompaniasNavierasService) {}


  async save(createEmbarqueInput: CreateEmbarqueInput) : Promise<Embarques> {
    var result: Embarques;

    if(createEmbarqueInput.idEmbarque){
      result = await this.embarquesRepository.save(createEmbarqueInput);
    }

    if(!createEmbarqueInput.idEmbarque){
      createEmbarqueInput.terminado = false;
      createEmbarqueInput.cancelado = false;

      let embarques = await this.findAll()
      createEmbarqueInput.numero = embarques.filter(embarque=> embarque.idContrato == createEmbarqueInput.idContrato).length;
      
      result = await this.embarquesRepository.save(createEmbarqueInput);
    }
    
    return result
  }

  async findAll(): Promise<Embarques[]> {
    return await this.embarquesRepository.find({relations:['companiaNaviera']});
  }

  async findOne(id: number) : Promise<Embarques> {
    return await this.embarquesRepository.findOne({where: {idEmbarque: id},relations:['contratoDesgloses','companiaNaviera']}); 
  }

  async findEmbarquesByIdContrato(idContrato: number) : Promise<any> {
    return await this.embarquesRepository.find({where: {idContrato}});
  }

  async remove(id: number) : Promise<any> {
    const embarques = await this.findOne(id);
    return await this.embarquesRepository.remove(embarques);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const embarques = await this.embarquesRepository.findByIds(id);
    return await this.embarquesRepository.remove(embarques);
  }

  async getCompaniaNaviera (Id: number) : Promise<CompaniasNavieras>{
    return this.companiasNavierasService.findOne(Id);
  }
}
