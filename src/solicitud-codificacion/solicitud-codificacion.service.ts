import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudCodificacion } from 'src/models/entities/SolicitudCodificacion.entity';
import { In, Repository } from 'typeorm';
import { CreateSolicitudCodificacionInput } from './dto/create-solicitud-codificacion.input';

@Injectable()
export class SolicitudCodificacionService {
  constructor(@InjectRepository(SolicitudCodificacion) public readonly solicitudCodificacionRepository: Repository<SolicitudCodificacion>) {}


  async save(createSolicitudCodificacionInput: CreateSolicitudCodificacionInput) : Promise<SolicitudCodificacion> {
    return await this.solicitudCodificacionRepository.save(createSolicitudCodificacionInput);
  }

  async findAll(): Promise<SolicitudCodificacion[]> { 
    return await this.solicitudCodificacionRepository.find({relations:['pliegoResumen','embalaje','unidadMedida','referencia']});
  }

  async findOne(id: number) : Promise<SolicitudCodificacion> {
    return await this.solicitudCodificacionRepository.findOne({where: {idSolicitudCompra: id},relations:['pliegoResumen','embalaje','unidadMedida','referencia']});
  }

  async remove(id: number) : Promise<any> {
    const solicitudCodificacion = await this.findOne(id);
    return await this.solicitudCodificacionRepository.remove(solicitudCodificacion);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const solicitudCodificacion = await this.solicitudCodificacionRepository.findBy({
      idSolicitudCompra: In(id)
  });
    return await this.solicitudCodificacionRepository.remove(solicitudCodificacion);
  }
}
