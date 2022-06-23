import { Module } from '@nestjs/common';
import { FichaCostoResumenService } from './ficha-costo-resumen.service';
import { FichaCostoResumenResolver } from './ficha-costo-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaCostoResumen } from 'src/models/entities/FichaCostoResumen.entity';
import { MonedaModule } from 'src/moneda/moneda.module';
import { FormasPagoModule } from 'src/formas-pago/formas-pago.module';
import { IncotermModule } from 'src/incoterm/incoterm.module';
import { PuertosModule } from 'src/puertos/puertos.module';
import { EmbalajesModule } from 'src/embalajes/embalajes.module';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { PaisesModule } from 'src/paises/paises.module';
import { CodigosParaLaVentaModule } from 'src/codigos-para-la-venta/codigos-para-la-venta.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    FichaCostoResumen
  ]),MonedaModule,FormasPagoModule,IncotermModule,PuertosModule,EmbalajesModule,ProveedoresModule,PaisesModule,CodigosParaLaVentaModule],
  providers: [FichaCostoResumenResolver, FichaCostoResumenService],
  exports: [FichaCostoResumenService]
})
export class FichaCostoResumenModule {}
