import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { MonedaModule } from './moneda/moneda.module';
import { join } from 'path';
import { EmbalajesModule } from './embalajes/embalajes.module';
import { CargoModule } from './cargo/cargo.module';
import { EjecutivoModule } from './ejecutivo/ejecutivo.module';
import { GruposDeComprasModule } from './grupos-de-compras/grupos-de-compras.module';
import { BasesCmarcoModule } from './bases-cmarco/bases-cmarco.module';
import { BasesCmarcoClausulasModule } from './bases-cmarco-clausulas/bases-cmarco-clausulas.module';
import { BasesCmarcoEspecificosModule } from './bases-cmarco-especificos/bases-cmarco-especificos.module';
import { BasesGeneralesModule } from './bases-generales/bases-generales.module';
import { BasesGeneralesClausulasModule } from './bases-generales-clausulas/bases-generales-clausulas.module';
import { ClasificacionesModule } from './clasificaciones/clasificaciones.module';
import { IncotermModule } from './incoterm/incoterm.module';
import { ProformasModule } from './proformas/proformas.module';
import { ProformaClausulasModule } from './proforma-clausulas/proforma-clausulas.module';
import { PuertosModule } from './puertos/puertos.module';
import { TipoContratoModule } from './tipo-contrato/tipo-contrato.module';
import { TiposDeClausulasModule } from './tipos-de-clausulas/tipos-de-clausulas.module';
import { DocumentacionModule } from './documentacion/documentacion.module';
import { DocumentacionContratoModule } from './documentacion-contrato/documentacion-contrato.module';
import { ContratosModule } from './contratos/contratos.module';
import { ContratoDesgloseModule } from './contrato-desglose/contrato-desglose.module';
import { NegociacionDetalleModule } from './negociacion-detalle/negociacion-detalle.module';
import { NegociacionDetallesModule } from './negociacion-detalles/negociacion-detalles.module';
import { NegociacionProveedoresModule } from './negociacion-proveedores/negociacion-proveedores.module';
import { NegociacionResumenModule } from './negociacion-resumen/negociacion-resumen.module';
import { TiposContenedorModule } from './tipos-contenedor/tipos-contenedor.module';
import { TiposDeComprasModule } from './tipos-de-compras/tipos-de-compras.module';
import { TiposDocumentoModule } from './tipos-documento/tipos-documento.module';
import { CompradoresModule } from './compradores/compradores.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { CampanaEtapasContratacionModule } from './campana-etapas-contratacion/campana-etapas-contratacion.module';
import { CampanasModule } from './campanas/campanas.module';
import { EtapasContratacionModule } from './etapas-contratacion/etapas-contratacion.module';
import { TiemposTravesiaModule } from './tiempos-travesia/tiempos-travesia.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
       autoSchemaFile: 'schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '10.128.19.54',
      port: 1433,
      username: 'sa',
      password: 'sa',
      database: 'CONTRATO',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false,  
      options: { encrypt: false },
    }),
    MonedaModule,
    EmbalajesModule,
    CargoModule,
    EjecutivoModule,
    GruposDeComprasModule,
    BasesCmarcoModule,
    BasesCmarcoClausulasModule,
    BasesCmarcoEspecificosModule,
    BasesGeneralesModule,
    BasesGeneralesClausulasModule,
    ClasificacionesModule,
    IncotermModule,
    ProformasModule,
    ProformaClausulasModule,
    PuertosModule,
    TipoContratoModule,
    TiposDeClausulasModule,
    DocumentacionModule,
    DocumentacionContratoModule,
    ContratosModule,
    ContratoDesgloseModule,
    NegociacionDetalleModule,
    NegociacionDetallesModule,
    NegociacionProveedoresModule,
    NegociacionResumenModule,
    TiposContenedorModule,
    TiposDeComprasModule,
    TiposDocumentoModule,
    CompradoresModule,
    ConfiguracionModule,
    CampanaEtapasContratacionModule,
    CampanasModule,
    EtapasContratacionModule,
    TiemposTravesiaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
