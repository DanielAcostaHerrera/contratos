import { PagosApartirDeModule } from './../pagos-apartir-de/pagos-apartir-de.module';
import { EjecutivoModule } from './../ejecutivo/ejecutivo.module';
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
import { SuplementoPuertoEmbarqueModule } from 'src/suplemento-puerto-embarque/suplemento-puerto-embarque.module';
import { SuplementoPagosModule } from 'src/suplemento-pagos/suplemento-pagos.module';
import { PagosModule } from 'src/pagos/pagos.module';
import { FormasPagoModule } from 'src/formas-pago/formas-pago.module';
import { PuertosModule } from 'src/puertos/puertos.module';
import { ReferenciasModule } from 'src/referencias/referencias.module';
import { UnidadMedidaModule } from 'src/unidad-medida/unidad-medida.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Contratos]
  ),BasesGeneralesModule,ContratoMarcoModule,MonedaModule,FormasEntregaModule,NegociacionResumenModule,EjecutivoModule,
  PaisesModule,AgenciasAseguradorasModule,CompaniasNavierasModule,LogsModule,IncotermModule,ContratoClausulaModule,SuplementoResumenModule,
  SuplementoClausulasModule, SuplementoChangeModule, SuplementoEmbarquesModule, SuplementoDesgloseModule,EmbarquesModule,ContratoDesgloseModule,
  CodigosParaLaVentaModule,PuertoEmbarqueModule, SuplementoPuertoEmbarqueModule, SuplementoPagosModule, PagosModule, FormasPagoModule, PagosApartirDeModule,
  PuertosModule, ReferenciasModule, UnidadMedidaModule],
  providers: [ContratosResolver, ContratosService],
  exports: [ContratosService]
})
export class ContratosModule {}
