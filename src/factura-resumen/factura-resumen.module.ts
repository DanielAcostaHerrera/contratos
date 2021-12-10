import { Module } from '@nestjs/common';
import { FacturaResumenService } from './factura-resumen.service';
import { FacturaResumenResolver } from './factura-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaResumen } from 'src/models/entities/FacturaResumen.entity';
import { ContratosModule } from 'src/contratos/contratos.module';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { EjecutivoModule } from 'src/ejecutivo/ejecutivo.module';
import { NegociacionResumenModule } from 'src/negociacion-resumen/negociacion-resumen.module';
import { PuertosModule } from 'src/puertos/puertos.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    FacturaResumen
  ]),ContratosModule,EmbarquesModule,EjecutivoModule,NegociacionResumenModule,PuertosModule],
  providers: [FacturaResumenResolver, FacturaResumenService],
  exports: [FacturaResumenService]
})
export class FacturaResumenModule {}
