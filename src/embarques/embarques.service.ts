import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratosService } from 'src/contratos/contratos.service';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Repository } from 'typeorm';
import { CreateEmbarqueInput } from './dto/create-embarque.input';

@Injectable()
export class EmbarquesService {
  constructor(@InjectRepository(Embarques) public readonly embarquesRepository: Repository<Embarques>,
  private contratosService: ContratosService,private ejecutivoService: EjecutivoService) {}


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
    return await this.embarquesRepository.delete(id);
  }

  async getContrato (Id: number) : Promise<Contratos>{
    return this.contratosService.findOne(Id);
  }

  async getEjecutivo (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }
}
