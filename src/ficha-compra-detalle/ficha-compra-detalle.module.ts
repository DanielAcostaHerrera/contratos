import { Module } from '@nestjs/common';
import { FichaCompraDetalleService } from './ficha-compra-detalle.service';
import { FichaCompraDetalleResolver } from './ficha-compra-detalle.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaCompraDetalle } from 'src/models/entities/FichaCompraDetalle.entity';
import { FichaCompraResumenModule } from 'src/ficha-compra-resumen/ficha-compra-resumen.module';
import { CodigosParaLaVentaModule } from 'src/codigos-para-la-venta/codigos-para-la-venta.module';
import { UnidadMedidaModule } from 'src/unidad-medida/unidad-medida.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    FichaCompraDetalle
  ]),FichaCompraResumenModule,CodigosParaLaVentaModule,UnidadMedidaModule],
  providers: [FichaCompraDetalleResolver, FichaCompraDetalleService],
  exports: [FichaCompraDetalleService]
})
export class FichaCompraDetalleModule {}
