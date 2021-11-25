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
      database: 'Contratos',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false,  
      options: { encrypt: false },
    }),
    MonedaModule,
    EmbalajesModule,
    CargoModule,
    EjecutivoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
