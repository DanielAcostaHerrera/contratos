import { Module } from '@nestjs/common';
import { SolicitudOfertasEntradasService } from './solicitud-ofertas-entradas.service';
import { SolicitudOfertasEntradasResolver } from './solicitud-ofertas-entradas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudOfertasEntradas } from 'src/models/entities/SolicitudOfertasEntradas.entity';
import { SolicitudOfertasProveedorModule } from 'src/solicitud-ofertas-proveedor/solicitud-ofertas-proveedor.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SolicitudOfertasEntradas
  ]),SolicitudOfertasProveedorModule],
  providers: [SolicitudOfertasEntradasResolver, SolicitudOfertasEntradasService],
  exports: [SolicitudOfertasEntradasService]
})
export class SolicitudOfertasEntradasModule {}
