import { Module } from '@nestjs/common';
import { FichaCompraResumenService } from './ficha-compra-resumen.service';
import { FichaCompraResumenResolver } from './ficha-compra-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaCompraResumen } from 'src/models/entities/FichaCompraResumen.entity';
import { MonedaModule } from 'src/moneda/moneda.module';
import { IncotermModule } from 'src/incoterm/incoterm.module';
import { ContratosModule } from 'src/contratos/contratos.module';
import { NegociacionResumenModule } from 'src/negociacion-resumen/negociacion-resumen.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    FichaCompraResumen
  ]),MonedaModule,IncotermModule,ContratosModule,NegociacionResumenModule],
  providers: [FichaCompraResumenResolver, FichaCompraResumenService],
  exports: [FichaCompraResumenService]
})
export class FichaCompraResumenModule {}
