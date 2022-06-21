import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { ContratosService } from 'src/contratos/contratos.service';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { SuplementoEmbarques } from 'src/models/entities/SuplementoEmbarques.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { PuertosService } from 'src/puertos/puertos.service';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoEmbarqueInput } from './dto/create-suplemento-embarque.input';

@Injectable()
export class SuplementoEmbarquesService {
  constructor(@InjectRepository(SuplementoEmbarques) public readonly suplementoEmbarqueRepository: Repository<SuplementoEmbarques>,
  private embarquesService: EmbarquesService,private puertosService: PuertosService,
  private contratosService: ContratosService,private suplementoResumenService: SuplementoResumenService,
  private companiaNavieraService: CompaniasNavierasService) {}


  async save(createSuplementoEmbarqueInput: CreateSuplementoEmbarqueInput) : Promise<SuplementoEmbarques> {
    return await this.suplementoEmbarqueRepository.save(createSuplementoEmbarqueInput);
  }

  async findAll(): Promise<SuplementoEmbarques[]> {
    return await this.suplementoEmbarqueRepository.find();
  }

  async findOne(id: number) : Promise<SuplementoEmbarques> {
    return await this.suplementoEmbarqueRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const suplementoEmbarques = await this.findOne(id);
    return await this.suplementoEmbarqueRepository.remove(suplementoEmbarques);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoEmbarques = await this.suplementoEmbarqueRepository.findByIds(id);
    return await this.suplementoEmbarqueRepository.remove(suplementoEmbarques);
  }

  async getContrato (id: number) : Promise<Contratos>{
    return this.contratosService.findOne(id);
  }

  async getPuertoDestino (id: number) : Promise<Puertos>{
    return this.puertosService.findOne(id);
  }

  async getSuplementoResumen (id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(id);
  }

  async getEmbarque (id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(id);
  }

  async getNaviera (id: number) : Promise<CompaniasNavieras>{
    return this.companiaNavieraService.findOne(id);
  }
}
