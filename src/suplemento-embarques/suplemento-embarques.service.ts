import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { SuplementoEmbarques } from 'src/models/entities/SuplementoEmbarques.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoEmbarqueInput } from './dto/create-suplemento-embarque.input';

@Injectable()
export class SuplementoEmbarquesService {
  constructor(@InjectRepository(SuplementoEmbarques) public readonly suplementoEmbarqueRepository: Repository<SuplementoEmbarques>,
  private suplementoResumenService: SuplementoResumenService,
  private companiaNavieraService: CompaniasNavierasService) {}


  async save(createSuplementoEmbarqueInput: CreateSuplementoEmbarqueInput) : Promise<SuplementoEmbarques> {
    return await this.suplementoEmbarqueRepository.save(createSuplementoEmbarqueInput);
  }

  async findAll(): Promise<SuplementoEmbarques[]> {
    return await this.suplementoEmbarqueRepository.find({relations:['embarques','contrato']});
  }

  async findOne(id: number) : Promise<SuplementoEmbarques> {
    return await this.suplementoEmbarqueRepository.findOne(id,{relations:['embarques','contrato']});
  }

  async remove(id: number) : Promise<any> {
    const suplementoEmbarques = await this.findOne(id);
    return await this.suplementoEmbarqueRepository.remove(suplementoEmbarques);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoEmbarques = await this.suplementoEmbarqueRepository.findByIds(id);
    return await this.suplementoEmbarqueRepository.remove(suplementoEmbarques);
  }

  async getSuplementoResumen (id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(id);
  }

  async getNaviera (id: number) : Promise<CompaniasNavieras>{
    return this.companiaNavieraService.findOne(id);
  }
}
