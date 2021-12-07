import { Module } from '@nestjs/common';
import { FichaCompraDetalleService } from './ficha-compra-detalle.service';
import { FichaCompraDetalleResolver } from './ficha-compra-detalle.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaCompraDetalle } from 'src/models/entities/FichaCompraDetalle.entity';
import { FichaCompraResumenModule } from 'src/ficha-compra-resumen/ficha-compra-resumen.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    FichaCompraDetalle
  ]),FichaCompraResumenModule],
  providers: [FichaCompraDetalleResolver, FichaCompraDetalleService],
  exports: [FichaCompraDetalleService]
})
export class FichaCompraDetalleModule {}
