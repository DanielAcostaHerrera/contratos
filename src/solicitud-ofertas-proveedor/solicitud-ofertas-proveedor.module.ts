import { Module } from '@nestjs/common';
import { SolicitudOfertasProveedorService } from './solicitud-ofertas-proveedor.service';
import { SolicitudOfertasProveedorResolver } from './solicitud-ofertas-proveedor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SolicitudOfertasProveedor
  ])],
  providers: [SolicitudOfertasProveedorResolver, SolicitudOfertasProveedorService],
  exports: [SolicitudOfertasProveedorService]
})
export class SolicitudOfertasProveedorModule {}
