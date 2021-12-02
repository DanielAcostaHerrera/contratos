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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
