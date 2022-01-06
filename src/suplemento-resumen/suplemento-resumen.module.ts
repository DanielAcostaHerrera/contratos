import { Module } from '@nestjs/common';
import { SuplementoResumenService } from './suplemento-resumen.service';
import { SuplementoResumenResolver } from './suplemento-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { ContratosModule } from 'src/contratos/contratos.module';
import { PuertosModule } from 'src/puertos/puertos.module';
import { EjecutivoModule } from 'src/ejecutivo/ejecutivo.module';
import { MonedaModule } from 'src/moneda/moneda.module';
import { AgenciasAseguradorasModule } from 'src/agencias-aseguradoras/agencias-aseguradoras.module';
import { CompaniasNavierasModule } from 'src/companias-navieras/companias-navieras.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoResumen
  ]),ContratosModule,PuertosModule,EjecutivoModule,MonedaModule,AgenciasAseguradorasModule,CompaniasNavierasModule],
  providers: [SuplementoResumenResolver, SuplementoResumenService],
  exports: [SuplementoResumenService]
})
export class SuplementoResumenModule {}
