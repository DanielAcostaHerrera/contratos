import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';
import { In, Repository } from 'typeorm';
import { CreateSolicitudOfertasProveedorInput } from './dto/create-solicitud-ofertas-proveedor.input';

@Injectable()
export class SolicitudOfertasProveedorService {
  constructor(@InjectRepository(SolicitudOfertasProveedor) public readonly solicitudOfertasProveedorRepository: Repository<SolicitudOfertasProveedor>) {}


  async save(createSolicitudOfertasProveedorInput: CreateSolicitudOfertasProveedorInput) : Promise<SolicitudOfertasProveedor> {
    return await this.solicitudOfertasProveedorRepository.save(createSolicitudOfertasProveedorInput);
  }

  async findAll(): Promise<SolicitudOfertasProveedor[]> { 
    return await this.solicitudOfertasProveedorRepository.find({relations:['solicitudOfertasEntradas','solicitudOfertas','proveedor']});
  }

  async findOne(id: number) : Promise<SolicitudOfertasProveedor> {
    return await this.solicitudOfertasProveedorRepository.findOne({where: {idOfertasProveedor: id},relations:['solicitudOfertasEntradas','solicitudOfertas','proveedor']});
  }

  async remove(id: number) : Promise<any> {
    const solicitudOfertasProveedor = await this.findOne(id);
    return await this.solicitudOfertasProveedorRepository.remove(solicitudOfertasProveedor);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const solicitudOfertasProveedor = await this.solicitudOfertasProveedorRepository.findBy({
      idOfertasProveedor: In(id)
  });
    return await this.solicitudOfertasProveedorRepository.remove(solicitudOfertasProveedor);
  }
}
