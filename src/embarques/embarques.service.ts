import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { Repository } from 'typeorm';
import { CreateEmbarqueInput } from './dto/create-embarque.input';

@Injectable()
export class EmbarquesService {
  constructor(@InjectRepository(Embarques) public readonly embarquesRepository: Repository<Embarques>,
  private ejecutivoService: EjecutivoService,
  private companiasNavierasService: CompaniasNavierasService) {}


  async save(createEmbarqueInput: CreateEmbarqueInput) : Promise<Embarques> {
    return await this.embarquesRepository.save(createEmbarqueInput);
  }

  async findAll(): Promise<Embarques[]> {
    return await this.embarquesRepository.find({relations:['contratos','contratoDesgloses', 'facturaResumen','suplementoChanges','suplementoDesgloses','suplementoEmbarques',
    'suplementoPagos','puertoEmbarques']});
  }

  async findOne(id: number) : Promise<Embarques> {
    return await this.embarquesRepository.findOne(id,{relations:['contratos','contratoDesgloses', 'facturaResumen','suplementoChanges','suplementoDesgloses',
    'suplementoEmbarques','suplementoPagos','puertoEmbarques']});
  }

  async remove(id: number) : Promise<any> {
    const embarques = await this.findOne(id);
    return await this.embarquesRepository.remove(embarques);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const embarques = await this.embarquesRepository.findByIds(id);
    return await this.embarquesRepository.remove(embarques);
  }

  async getEjecutivo (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getCompaniaNaviera (Id: number) : Promise<CompaniasNavieras>{
    return this.companiasNavierasService.findOne(Id);
  }
}
