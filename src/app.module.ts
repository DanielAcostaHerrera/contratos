import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { MonedaModule } from './moneda/moneda.module';
import { join } from 'path';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
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
import { ContratoClausulaModule } from './contrato-clausulas/contrato-clausulas.module';
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
import { DatosEntidadModule } from './datos-entidad/datos-entidad.module';
import { FichaCompraAtributosModule } from './ficha-compra-atributos/ficha-compra-atributos.module';
import { FichaCompraDetalleModule } from './ficha-compra-detalle/ficha-compra-detalle.module';
import { FichaCompraResumenModule } from './ficha-compra-resumen/ficha-compra-resumen.module';
import { FichaCostoResumenModule } from './ficha-costo-resumen/ficha-costo-resumen.module';
import { FormasEntregaModule } from './formas-entrega/formas-entrega.module';
import { FormasPagoModule } from './formas-pago/formas-pago.module';
import { PliegoConcurrenciaModule } from './pliego-concurrencia/pliego-concurrencia.module';
import { PliegoConcurrenciaDetalleModule } from './pliego-concurrencia-detalle/pliego-concurrencia-detalle.module';
import { PliegoConcurrenciaResumenModule } from './pliego-concurrencia-resumen/pliego-concurrencia-resumen.module';
import { SolicitudCodificacionModule } from './solicitud-codificacion/solicitud-codificacion.module';
import { SolicitudContratacionModule } from './solicitud-contratacion/solicitud-contratacion.module';
import { SolicitudOfertasModule } from './solicitud-ofertas/solicitud-ofertas.module';
import { SolicitudOfertasEntradasModule } from './solicitud-ofertas-entradas/solicitud-ofertas-entradas.module';
import { SolicitudOfertasProveedorModule } from './solicitud-ofertas-proveedor/solicitud-ofertas-proveedor.module';
import { ContratosModule } from './contratos/contratos.module';
import { ContenedoresModule } from './contenedores/contenedores.module';
import { ContratoDesgloseModule } from './contrato-desglose/contrato-desglose.module';
import { EmbarquesModule } from './embarques/embarques.module';
import { FacturaResumenModule } from './factura-resumen/factura-resumen.module';
import { FacturaContenedorModule } from './factura-contenedor/factura-contenedor.module';
import { FacturaDesgloseModule } from './factura-desglose/factura-desglose.module';
import { SuplementoResumenModule } from './suplemento-resumen/suplemento-resumen.module';
import { SuplementoPagosModule } from './suplemento-pagos/suplemento-pagos.module';
import { SuplementoEmbarquesModule } from './suplemento-embarques/suplemento-embarques.module';
import { SuplementoDesgloseModule } from './suplemento-desglose/suplemento-desglose.module';
import { SuplementoClausulasModule } from './suplemento-clausulas/suplemento-clausulas.module';
import { SuplementoChangeModule } from './suplemento-change/suplemento-change.module';
import { CambiosSuplementosModule } from './cambios-suplementos/cambios-suplementos.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuarioRolModule } from './usuario-rol/usuario-rol.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { EspecificosModule } from './especificos/especificos.module';
import { PaisesModule } from './paises/paises.module';
import { UnidadMedidaModule } from './unidad-medida/unidad-medida.module';
import { AgenciasAseguradorasModule } from './agencias-aseguradoras/agencias-aseguradoras.module';
import { CompaniasNavierasModule } from './companias-navieras/companias-navieras.module';
import { ReferenciasModule } from './referencias/referencias.module';
import { CodigosParaLaVentaModule } from './codigos-para-la-venta/codigos-para-la-venta.module';

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
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '10.128.16.10',
      port: 1433,
      username: 'sa',
      password: 'adminstyle.378',
      database: 'Mercurio',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false,  
      options: { encrypt: false },
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '10.128.16.10',
      port: 1433,
      username: 'sa',
      password: 'adminstyle.378',
      database: 'Nomgen',
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
    ContratoClausulaModule,
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
    DatosEntidadModule,
    FichaCompraAtributosModule,
    FichaCompraDetalleModule,
    FichaCompraResumenModule,
    FichaCostoResumenModule,
    FormasEntregaModule,
    FormasPagoModule,
    PliegoConcurrenciaModule,
    PliegoConcurrenciaDetalleModule,
    PliegoConcurrenciaResumenModule,
    SolicitudCodificacionModule,
    SolicitudContratacionModule,
    SolicitudOfertasModule,
    SolicitudOfertasEntradasModule,
    SolicitudOfertasProveedorModule,
    ContenedoresModule,
    ContratoDesgloseModule,
    EmbarquesModule,
    FacturaResumenModule,
    FacturaContenedorModule,
    FacturaDesgloseModule,
    SuplementoResumenModule,
    SuplementoPagosModule,
    SuplementoEmbarquesModule,
    SuplementoDesgloseModule,
    SuplementoClausulasModule,
    SuplementoChangeModule,
    CambiosSuplementosModule,
    RolesModule,
    UsuariosModule,
    UsuarioRolModule,
    ProveedoresModule,
    EspecificosModule,
    PaisesModule,
    UnidadMedidaModule,
    AgenciasAseguradorasModule,
    CompaniasNavierasModule,
    ReferenciasModule,
    CodigosParaLaVentaModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
