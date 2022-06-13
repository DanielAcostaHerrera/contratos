import { TiposDeComprasModule } from './../tipos-de-compras/tipos-de-compras.module';
import { Module } from '@nestjs/common';
import { NegociacionResumenService } from './negociacion-resumen.service';
import { NegociacionResumenResolver } from './negociacion-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { MonedaModule } from 'src/moneda/moneda.module';
import { GruposDeComprasModule } from 'src/grupos-de-compras/grupos-de-compras.module';
import { LogsModule } from 'src/logs/logs.module';
import { NegociacionProveedoresModule } from 'src/negociacion-proveedores/negociacion-proveedores.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    NegociacionResumen
  ]),TiposDeComprasModule,MonedaModule,GruposDeComprasModule,LogsModule,NegociacionProveedoresModule],
  providers: [NegociacionResumenResolver, NegociacionResumenService],
  exports: [NegociacionResumenService]
})
export class NegociacionResumenModule {}
