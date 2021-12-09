import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { SolicitudCodificacion } from 'src/models/entities/SolicitudCodificacion.entity';
import { PliegoConcurrenciaResumenService } from 'src/pliego-concurrencia-resumen/pliego-concurrencia-resumen.service';
import { Repository } from 'typeorm';
import { CreateSolicitudCodificacionInput } from './dto/create-solicitud-codificacion.input';

@Injectable()
export class SolicitudCodificacionService {
  constructor(@InjectRepository(SolicitudCodificacion) public readonly solicitudCodificacionRepository: Repository<SolicitudCodificacion>,
  private pliegoConcurrenciaResumenService: PliegoConcurrenciaResumenService) {}


  async save(createSolicitudCodificacionInput: CreateSolicitudCodificacionInput) : Promise<SolicitudCodificacion> {
    return await this.solicitudCodificacionRepository.save(createSolicitudCodificacionInput);
  }

  async findAll(): Promise<SolicitudCodificacion[]> { 
    return await this.solicitudCodificacionRepository.find();
  }

  async findOne(id: number) : Promise<SolicitudCodificacion> {
    return await this.solicitudCodificacionRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.solicitudCodificacionRepository.delete(id);
  }

  async getPliegoConcurrenciaResumen (id: number) : Promise<PliegoConcurrenciaResumen>{
    return this.pliegoConcurrenciaResumenService.findOne(id);
  }
}
