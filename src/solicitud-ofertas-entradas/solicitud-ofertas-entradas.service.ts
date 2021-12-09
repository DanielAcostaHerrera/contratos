import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudOfertasEntradas } from 'src/models/entities/SolicitudOfertasEntradas.entity';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';
import { SolicitudOfertasProveedorService } from 'src/solicitud-ofertas-proveedor/solicitud-ofertas-proveedor.service';
import { Repository } from 'typeorm';
import { CreateSolicitudOfertasEntradaInput } from './dto/create-solicitud-ofertas-entrada.input';

@Injectable()
export class SolicitudOfertasEntradasService {
  constructor(@InjectRepository(SolicitudOfertasEntradas) public readonly solicitudOfertaEntradaRepository: Repository<SolicitudOfertasEntradas>,
  private solicitudOfertasProveedorService: SolicitudOfertasProveedorService) {}


  async save(createSolicitudOfertasEntradaInput: CreateSolicitudOfertasEntradaInput) : Promise<SolicitudOfertasEntradas> {
    return await this.solicitudOfertaEntradaRepository.save(createSolicitudOfertasEntradaInput);
  }

  async findAll(): Promise<SolicitudOfertasEntradas[]> { 
    return await this.solicitudOfertaEntradaRepository.find();
  }

  async findOne(id: number) : Promise<SolicitudOfertasEntradas> {
    return await this.solicitudOfertaEntradaRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.solicitudOfertaEntradaRepository.delete(id);
  }

  async getSolicitudOfertasProveedor (id: number) : Promise<SolicitudOfertasProveedor>{
    return this.solicitudOfertasProveedorService.findOne(id);
  }
}