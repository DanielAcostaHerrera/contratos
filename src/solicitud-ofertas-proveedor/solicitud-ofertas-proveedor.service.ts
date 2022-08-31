import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { SolicitudOfertasService } from 'src/solicitud-ofertas/solicitud-ofertas.service';
import { Repository } from 'typeorm';
import { CreateSolicitudOfertasProveedorInput } from './dto/create-solicitud-ofertas-proveedor.input';

@Injectable()
export class SolicitudOfertasProveedorService {
  constructor(@InjectRepository(SolicitudOfertasProveedor) public readonly solicitudOfertasProveedorRepository: Repository<SolicitudOfertasProveedor>,
  private solicitudOfertasService: SolicitudOfertasService, private proveedoresService: ProveedoresService) {}


  async save(createSolicitudOfertasProveedorInput: CreateSolicitudOfertasProveedorInput) : Promise<SolicitudOfertasProveedor> {
    return await this.solicitudOfertasProveedorRepository.save(createSolicitudOfertasProveedorInput);
  }

  async findAll(): Promise<SolicitudOfertasProveedor[]> { 
    return await this.solicitudOfertasProveedorRepository.find({relations:['solicitudOfertasEntradas']});
  }

  async findOne(id: number) : Promise<SolicitudOfertasProveedor> {
    return await this.solicitudOfertasProveedorRepository.findOne({where: {idOfertasProveedor: id},relations:['solicitudOfertasEntradas']});
  }

  async remove(id: number) : Promise<any> {
    const solicitudOfertasProveedor = await this.findOne(id);
    return await this.solicitudOfertasProveedorRepository.remove(solicitudOfertasProveedor);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const solicitudOfertasProveedor = await this.solicitudOfertasProveedorRepository.findByIds(id);
    return await this.solicitudOfertasProveedorRepository.remove(solicitudOfertasProveedor);
  }

  async getSolicitudOfertas (id: number) : Promise<SolicitudOfertas>{
    return this.solicitudOfertasService.findOne(id);
  }

  async getProveedor (id: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(id);
  }
}
