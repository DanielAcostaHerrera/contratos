import { Module } from '@nestjs/common';
import { SuplementoPagosService } from './suplemento-pagos.service';
import { SuplementoPagosResolver } from './suplemento-pagos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoPagos } from 'src/models/entities/SuplementoPagos.entity';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { FormasPagoModule } from 'src/formas-pago/formas-pago.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoPagos
  ]),SuplementoResumenModule,EmbarquesModule,FormasPagoModule],
  providers: [SuplementoPagosResolver, SuplementoPagosService],
  exports: [SuplementoPagosService]
})
export class SuplementoPagosModule {}
