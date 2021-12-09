import { Module } from '@nestjs/common';
import { PliegoConcurrenciaDetalleService } from './pliego-concurrencia-detalle.service';
import { PliegoConcurrenciaDetalleResolver } from './pliego-concurrencia-detalle.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PliegoConcurrenciaDetalle } from 'src/models/entities/PliegoConcurrenciaDetalle.entity';
import { PliegoConcurrenciaResumenModule } from 'src/pliego-concurrencia-resumen/pliego-concurrencia-resumen.module';
import { EmbalajesModule } from 'src/embalajes/embalajes.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    PliegoConcurrenciaDetalle
  ]),PliegoConcurrenciaResumenModule,EmbalajesModule],
  providers: [PliegoConcurrenciaDetalleResolver, PliegoConcurrenciaDetalleService],
  exports: [PliegoConcurrenciaDetalleService]
})
export class PliegoConcurrenciaDetalleModule {}
