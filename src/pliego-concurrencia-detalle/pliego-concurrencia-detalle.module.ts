import { Module } from '@nestjs/common';
import { PliegoConcurrenciaDetalleService } from './pliego-concurrencia-detalle.service';
import { PliegoConcurrenciaDetalleResolver } from './pliego-concurrencia-detalle.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PliegoConcurrenciaDetalle } from 'src/models/entities/PliegoConcurrenciaDetalle.entity';
import { PliegoConcurrenciaResumenModule } from 'src/pliego-concurrencia-resumen/pliego-concurrencia-resumen.module';
import { EmbalajesModule } from 'src/embalajes/embalajes.module';
import { UnidadMedidaModule } from 'src/unidad-medida/unidad-medida.module';
import { EspecificosModule } from 'src/especificos/especificos.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    PliegoConcurrenciaDetalle
  ]),PliegoConcurrenciaResumenModule,EmbalajesModule,UnidadMedidaModule,EspecificosModule],
  providers: [PliegoConcurrenciaDetalleResolver, PliegoConcurrenciaDetalleService],
  exports: [PliegoConcurrenciaDetalleService]
})
export class PliegoConcurrenciaDetalleModule {}
