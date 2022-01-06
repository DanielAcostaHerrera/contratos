import { EjecutivoModule } from './../ejecutivo/ejecutivo.module';
import { FichaCostoResumenModule } from './../ficha-costo-resumen/ficha-costo-resumen.module';
import { BasesCmarcoModule } from './../bases-cmarco/bases-cmarco.module';
import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosResolver } from './contratos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { BasesGeneralesModule } from 'src/bases-generales/bases-generales.module';
import { PuertosModule } from 'src/puertos/puertos.module';
import { MonedaModule } from 'src/moneda/moneda.module';
import { FormasEntregaModule } from 'src/formas-entrega/formas-entrega.module';
import { NegociacionResumenModule } from 'src/negociacion-resumen/negociacion-resumen.module';
import { PaisesModule } from 'src/paises/paises.module';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { AgenciasAseguradorasModule } from 'src/agencias-aseguradoras/agencias-aseguradoras.module';
import { CompaniasNavierasModule } from 'src/companias-navieras/companias-navieras.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Contratos]
  ),BasesGeneralesModule,BasesCmarcoModule,PuertosModule,MonedaModule,FormasEntregaModule,NegociacionResumenModule,FichaCostoResumenModule,EjecutivoModule,
  PaisesModule,ProveedoresModule,AgenciasAseguradorasModule,CompaniasNavierasModule],
  providers: [ContratosResolver, ContratosService],
  exports: [ContratosService]
})
export class ContratosModule {}
