import { Module } from '@nestjs/common';
import { NegociacionDetalleService } from './negociacion-detalle.service';
import { NegociacionDetalleResolver } from './negociacion-detalle.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociacionDetalle } from 'src/models/entities/NegociacionDetalle.entity';
import { NegociacionResumenModule } from 'src/negociacion-resumen/negociacion-resumen.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    NegociacionDetalle
  ]),NegociacionResumenModule],
  providers: [NegociacionDetalleResolver, NegociacionDetalleService],
  exports: [NegociacionDetalleService]
})
export class NegociacionDetalleModule {}
