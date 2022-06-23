import { Module } from '@nestjs/common';
import { SuplementoResumenService } from './suplemento-resumen.service';
import { SuplementoResumenResolver } from './suplemento-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { EjecutivoModule } from 'src/ejecutivo/ejecutivo.module';
import { MonedaModule } from 'src/moneda/moneda.module';
import { AgenciasAseguradorasModule } from 'src/agencias-aseguradoras/agencias-aseguradoras.module';
import { CompaniasNavierasModule } from 'src/companias-navieras/companias-navieras.module';
import { NegociacionResumenModule } from 'src/negociacion-resumen/negociacion-resumen.module';
import { PaisesModule } from 'src/paises/paises.module';
import { IncotermModule } from 'src/incoterm/incoterm.module';
import { FormasEntregaModule } from 'src/formas-entrega/formas-entrega.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoResumen
  ]),EjecutivoModule,MonedaModule,AgenciasAseguradorasModule,CompaniasNavierasModule,NegociacionResumenModule,PaisesModule,
  IncotermModule,FormasEntregaModule],
  providers: [SuplementoResumenResolver, SuplementoResumenService],
  exports: [SuplementoResumenService]
})
export class SuplementoResumenModule {}
