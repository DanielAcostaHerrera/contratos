import { Module } from '@nestjs/common';
import { PliegoConcurrenciaResumenService } from './pliego-concurrencia-resumen.service';
import { PliegoConcurrenciaResumenResolver } from './pliego-concurrencia-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { PliegoConcurrenciaModule } from 'src/pliego-concurrencia/pliego-concurrencia.module';
import { MonedaModule } from 'src/moneda/moneda.module';
import { IncotermModule } from 'src/incoterm/incoterm.module';
import { FormasPagoModule } from 'src/formas-pago/formas-pago.module';
import { FormasEntregaModule } from 'src/formas-entrega/formas-entrega.module';
import { PuertosModule } from 'src/puertos/puertos.module';
import { TiposContenedorModule } from 'src/tipos-contenedor/tipos-contenedor.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    PliegoConcurrenciaResumen
  ]),PliegoConcurrenciaModule,MonedaModule,IncotermModule,FormasPagoModule,FormasEntregaModule,PuertosModule,TiposContenedorModule],
  providers: [PliegoConcurrenciaResumenResolver, PliegoConcurrenciaResumenService],
  exports: [PliegoConcurrenciaResumenService]
})
export class PliegoConcurrenciaResumenModule {}
