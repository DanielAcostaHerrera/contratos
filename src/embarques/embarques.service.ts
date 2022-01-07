import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { ContratosService } from 'src/contratos/contratos.service';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { PuertosService } from 'src/puertos/puertos.service';
import { Repository } from 'typeorm';
import { CreateEmbarqueInput } from './dto/create-embarque.input';

@Injectable()
export class EmbarquesService {
  constructor(@InjectRepository(Embarques) public readonly embarquesRepository: Repository<Embarques>,
  private contratosService: ContratosService,private ejecutivoService: EjecutivoService,
  private puertosService: PuertosService,private companiasNavierasService: CompaniasNavierasService) {}


  async save(createEmbarqueInput: CreateEmbarqueInput) : Promise<Embarques> {
    return await this.embarquesRepository.save(createEmbarqueInput);
  }

  async findAll(): Promise<Embarques[]> {
    return await this.embarquesRepository.find({relations:['contratoDesgloses', 'facturaResumen','suplementoChanges','suplementoDesgloses','suplementoEmbarques','suplementoPagos']});
  }

  async findOne(id: number) : Promise<Embarques> {
    return await this.embarquesRepository.findOne(id,{relations:['contratoDesgloses', 'facturaResumen','suplementoChanges','suplementoDesgloses','suplementoEmbarques','suplementoPagos']});
  }

  async remove(id: number) : Promise<any> {
    const embarques = await this.findOne(id);
    return await this.embarquesRepository.remove(embarques);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const embarques = await this.embarquesRepository.findByIds(id);
    return await this.embarquesRepository.remove(embarques);
  }

  async getContrato (Id: number) : Promise<Contratos>{
    return this.contratosService.findOne(Id);
  }

  async getEjecutivo (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getPuertoDestino (Id: number) : Promise<Puertos>{
    return this.puertosService.findOne(Id);
  }

  async getCompaniaNaviera (Id: number) : Promise<CompaniasNavieras>{
    return this.companiasNavierasService.findOne(Id);
  }
}