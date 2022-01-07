import { Module } from '@nestjs/common';
import { SolicitudOfertasEntradasService } from './solicitud-ofertas-entradas.service';
import { SolicitudOfertasEntradasResolver } from './solicitud-ofertas-entradas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudOfertasEntradas } from 'src/models/entities/SolicitudOfertasEntradas.entity';
import { SolicitudOfertasProveedorModule } from 'src/solicitud-ofertas-proveedor/solicitud-ofertas-proveedor.module';
import { ReferenciasModule } from 'src/referencias/referencias.module';
import { CodigosParaLaVentaModule } from 'src/codigos-para-la-venta/codigos-para-la-venta.module';
import { UnidadMedidaModule } from 'src/unidad-medida/unidad-medida.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SolicitudOfertasEntradas
  ]),SolicitudOfertasProveedorModule,ReferenciasModule,CodigosParaLaVentaModule,UnidadMedidaModule],
  providers: [SolicitudOfertasEntradasResolver, SolicitudOfertasEntradasService],
  exports: [SolicitudOfertasEntradasService]
})
export class SolicitudOfertasEntradasModule {}
