import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompradoresService } from 'src/compradores/compradores.service';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { SolicitudContratacion } from 'src/models/entities/SolicitudContratacion.entity';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { Repository } from 'typeorm';
import { CreateSolicitudContratacionInput } from './dto/create-solicitud-contratacion.input';

@Injectable()
export class SolicitudContratacionService {
  constructor(@InjectRepository(SolicitudContratacion) public readonly solicitudContratacionRepository: Repository<SolicitudContratacion>,
  private negociacionResumenService: NegociacionResumenService,private compradoresService: CompradoresService) {}


  async save(createSolicitudContratacionInput: CreateSolicitudContratacionInput) : Promise<SolicitudContratacion> {
    return await this.solicitudContratacionRepository.save(createSolicitudContratacionInput);
  }

  async findAll(): Promise<SolicitudContratacion[]> { 
    return await this.solicitudContratacionRepository.find({relations:['solicitudOfertas']});
  }

  async findOne(id: number) : Promise<SolicitudContratacion> {
    return await this.solicitudContratacionRepository.findOne(id,{relations:['solicitudOfertas']});
  }

  async remove(id: number) : Promise<any> {
    return await this.solicitudContratacionRepository.delete(id);
  }

  async getNegociacionResumen (id: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(id);
  }

  async getCompradores (id: number) : Promise<Compradores>{
    return this.compradoresService.findOne(id);
  }
}
