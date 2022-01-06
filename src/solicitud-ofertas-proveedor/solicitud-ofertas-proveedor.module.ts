import { Module } from '@nestjs/common';
import { SolicitudOfertasProveedorService } from './solicitud-ofertas-proveedor.service';
import { SolicitudOfertasProveedorResolver } from './solicitud-ofertas-proveedor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';
import { SolicitudOfertasModule } from 'src/solicitud-ofertas/solicitud-ofertas.module';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SolicitudOfertasProveedor
  ]),SolicitudOfertasModule,ProveedoresModule],
  providers: [SolicitudOfertasProveedorResolver, SolicitudOfertasProveedorService],
  exports: [SolicitudOfertasProveedorService]
})
export class SolicitudOfertasProveedorModule {}
