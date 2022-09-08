import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { SolicitudOfertasEntradas } from 'src/models/entities/SolicitudOfertasEntradas.entity';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { ReferenciasService } from 'src/referencias/referencias.service';
import { SolicitudOfertasProveedorService } from 'src/solicitud-ofertas-proveedor/solicitud-ofertas-proveedor.service';
import { UnidadMedidaService } from 'src/unidad-medida/unidad-medida.service';
import { In, Repository } from 'typeorm';
import { CreateSolicitudOfertasEntradaInput } from './dto/create-solicitud-ofertas-entrada.input';

@Injectable()
export class SolicitudOfertasEntradasService {
  constructor(@InjectRepository(SolicitudOfertasEntradas) public readonly solicitudOfertaEntradaRepository: Repository<SolicitudOfertasEntradas>,
  private solicitudOfertasProveedorService: SolicitudOfertasProveedorService,private referenciasService: ReferenciasService,
  private codigosParaLaVentaService: CodigosParaLaVentaService,private unidadMedidaService: UnidadMedidaService) {}


  async save(createSolicitudOfertasEntradaInput: CreateSolicitudOfertasEntradaInput) : Promise<SolicitudOfertasEntradas> {
    return await this.solicitudOfertaEntradaRepository.save(createSolicitudOfertasEntradaInput);
  }

  async findAll(): Promise<SolicitudOfertasEntradas[]> { 
    return await this.solicitudOfertaEntradaRepository.find();
  }

  async findOne(id: number) : Promise<SolicitudOfertasEntradas> {
    return await this.solicitudOfertaEntradaRepository.findOne({where: {idOfertasEntradas: id},});
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

  async getSolicitudOfertasProveedor (id: number) : Promise<SolicitudOfertasProveedor>{
    return this.solicitudOfertasProveedorService.findOne(id);
  }

  async getReferencia (id: number) : Promise<Referencias>{
    return this.referenciasService.findOne(id);
  }

  async getCodigo (id: number) : Promise<CodigosParaLaVenta>{
    return this.codigosParaLaVentaService.findOne(id);
  }

  async getUnidadMedida (id: number) : Promise<UnidadMedida>{
    return this.unidadMedidaService.findOne(id);
  }
}