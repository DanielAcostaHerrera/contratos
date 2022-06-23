import { EjecutivoModule } from './../ejecutivo/ejecutivo.module';
import { FichaCostoResumenModule } from './../ficha-costo-resumen/ficha-costo-resumen.module';
import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosResolver } from './contratos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { BasesGeneralesModule } from 'src/bases-generales/bases-generales.module';
import { MonedaModule } from 'src/moneda/moneda.module';
import { FormasEntregaModule } from 'src/formas-entrega/formas-entrega.module';
import { NegociacionResumenModule } from 'src/negociacion-resumen/negociacion-resumen.module';
import { PaisesModule } from 'src/paises/paises.module';
import { AgenciasAseguradorasModule } from 'src/agencias-aseguradoras/agencias-aseguradoras.module';
import { CompaniasNavierasModule } from 'src/companias-navieras/companias-navieras.module';
import { LogsModule } from 'src/logs/logs.module';
import { IncotermModule } from 'src/incoterm/incoterm.module';
import { ContratoMarcoModule } from 'src/contrato-marco/contrato-marco.module';
import { ContratoClausulaModule } from 'src/contrato-clausulas/contrato-clausulas.module';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { SuplementoClausulasModule } from 'src/suplemento-clausulas/suplemento-clausulas.module';
import { SuplementoChangeModule } from 'src/suplemento-change/suplemento-change.module';
import { SuplementoEmbarquesModule } from 'src/suplemento-embarques/suplemento-embarques.module';
import { SuplementoDesgloseModule } from 'src/suplemento-desglose/suplemento-desglose.module';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { ContratoDesgloseModule } from 'src/contrato-desglose/contrato-desglose.module';
import { CodigosParaLaVentaModule } from 'src/codigos-para-la-venta/codigos-para-la-venta.module';
import { PuertoEmbarqueModule } from 'src/puerto-embarque/puerto-embarque.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Contratos]
  ),BasesGeneralesModule,ContratoMarcoModule,MonedaModule,FormasEntregaModule,NegociacionResumenModule,FichaCostoResumenModule,EjecutivoModule,
  PaisesModule,AgenciasAseguradorasModule,CompaniasNavierasModule,LogsModule,IncotermModule,ContratoClausulaModule,SuplementoResumenModule,
  SuplementoClausulasModule, SuplementoChangeModule, SuplementoEmbarquesModule, SuplementoDesgloseModule,EmbarquesModule,ContratoDesgloseModule,
  CodigosParaLaVentaModule,PuertoEmbarqueModule],
  providers: [ContratosResolver, ContratosService],
  exports: [ContratosService]
})
export class ContratosModule {}
