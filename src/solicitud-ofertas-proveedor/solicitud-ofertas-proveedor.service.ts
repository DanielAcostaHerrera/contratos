import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';
import { SolicitudOfertasService } from 'src/solicitud-ofertas/solicitud-ofertas.service';
import { Repository } from 'typeorm';
import { CreateSolicitudOfertasProveedorInput } from './dto/create-solicitud-ofertas-proveedor.input';

@Injectable()
export class SolicitudOfertasProveedorService {
  constructor(@InjectRepository(SolicitudOfertasProveedor) public readonly solicitudOfertasProveedorRepository: Repository<SolicitudOfertasProveedor>,
  private solicitudOfertasService: SolicitudOfertasService) {}


  async save(createSolicitudOfertasProveedorInput: CreateSolicitudOfertasProveedorInput) : Promise<SolicitudOfertasProveedor> {
    return await this.solicitudOfertasProveedorRepository.save(createSolicitudOfertasProveedorInput);
  }

  async findAll(): Promise<SolicitudOfertasProveedor[]> { 
    return await this.solicitudOfertasProveedorRepository.find({relations:['solicitudOfertasEntradas']});
  }

  async findOne(id: number) : Promise<SolicitudOfertasProveedor> {
    return await this.solicitudOfertasProveedorRepository.findOne(id,{relations:['solicitudOfertasEntradas']});
  }

  async remove(id: number) : Promise<any> {
    return await this.solicitudOfertasProveedorRepository.delete(id);
  }

  async getSolicitudOfertas (id: number) : Promise<SolicitudOfertas>{
    return this.solicitudOfertasService.findOne(id);
  }
}
