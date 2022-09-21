import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudOfertasEntradas } from 'src/models/entities/SolicitudOfertasEntradas.entity';
import { In, Repository } from 'typeorm';
import { CreateSolicitudOfertasEntradaInput } from './dto/create-solicitud-ofertas-entrada.input';

@Injectable()
export class SolicitudOfertasEntradasService {
  constructor(@InjectRepository(SolicitudOfertasEntradas) public readonly solicitudOfertaEntradaRepository: Repository<SolicitudOfertasEntradas>) {}


  async save(createSolicitudOfertasEntradaInput: CreateSolicitudOfertasEntradaInput) : Promise<SolicitudOfertasEntradas> {
    return await this.solicitudOfertaEntradaRepository.save(createSolicitudOfertasEntradaInput);
  }

  async findAll(): Promise<SolicitudOfertasEntradas[]> { 
    return await this.solicitudOfertaEntradaRepository.find({relations:['ofertasProveedor','unidadMedida','codigo','referencia']});
  }

  async findOne(id: number) : Promise<SolicitudOfertasEntradas> {
    return await this.solicitudOfertaEntradaRepository.findOne({where: {idOfertasEntradas: id},relations:['ofertasProveedor','unidadMedida','codigo','referencia']});
  }

  async remove(id: number) : Promise<any> {
    const solicitudOfertasEntradas = await this.findOne(id);
    return await this.solicitudOfertaEntradaRepository.remove(solicitudOfertasEntradas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const solicitudOfertasEntradas = await this.solicitudOfertaEntradaRepository.findBy({
      idOfertasEntradas: In(id)
  });
    return await this.solicitudOfertaEntradaRepository.remove(solicitudOfertasEntradas);
  }
}