import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudContratacion } from 'src/models/entities/SolicitudContratacion.entity';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { SolicitudContratacionService } from 'src/solicitud-contratacion/solicitud-contratacion.service';
import { Repository } from 'typeorm';
import { CreateSolicitudOfertaInput } from './dto/create-solicitud-oferta.input';

@Injectable()
export class SolicitudOfertasService {
  constructor(@InjectRepository(SolicitudOfertas) public readonly solicitudOfertaRepository: Repository<SolicitudOfertas>,
  private solicitudContratacionService: SolicitudContratacionService) {}


  async save(createSolicitudOfertaInput: CreateSolicitudOfertaInput) : Promise<SolicitudOfertas> {
    return await this.solicitudOfertaRepository.save(createSolicitudOfertaInput);
  }

  async findAll(): Promise<SolicitudOfertas[]> { 
    return await this.solicitudOfertaRepository.find({relations:['pliegoConcurrencias','solicitudOfertasProveedores']});
  }

  async findOne(id: number) : Promise<SolicitudOfertas> {
    return await this.solicitudOfertaRepository.findOne(id,{relations:['pliegoConcurrencias','solicitudOfertasProveedores']});
  }

  async remove(id: number) : Promise<any> {
    return await this.solicitudOfertaRepository.delete(id);
  }

  async getSolicitudContratacion (id: number) : Promise<SolicitudContratacion>{
    return this.solicitudContratacionService.findOne(id);
  }
}
