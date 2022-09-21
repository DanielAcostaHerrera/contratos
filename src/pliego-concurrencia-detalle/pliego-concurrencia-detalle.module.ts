import { Module } from '@nestjs/common';
import { PliegoConcurrenciaDetalleService } from './pliego-concurrencia-detalle.service';
import { PliegoConcurrenciaDetalleResolver } from './pliego-concurrencia-detalle.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PliegoConcurrenciaDetalle } from 'src/models/entities/PliegoConcurrenciaDetalle.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    PliegoConcurrenciaDetalle
  ])],
  providers: [PliegoConcurrenciaDetalleResolver, PliegoConcurrenciaDetalleService],
  exports: [PliegoConcurrenciaDetalleService]
})
export class PliegoConcurrenciaDetalleModule {}
