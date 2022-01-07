import { Module } from '@nestjs/common';
import { SuplementoDesgloseService } from './suplemento-desglose.service';
import { SuplementoDesgloseResolver } from './suplemento-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoDesglose } from 'src/models/entities/SuplementoDesglose.entity';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { UnidadMedidaModule } from 'src/unidad-medida/unidad-medida.module';
import { CodigosParaLaVentaModule } from 'src/codigos-para-la-venta/codigos-para-la-venta.module';
import { ReferenciasModule } from 'src/referencias/referencias.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoDesglose
  ]),SuplementoResumenModule,EmbarquesModule,UnidadMedidaModule,CodigosParaLaVentaModule,ReferenciasModule],
  providers: [SuplementoDesgloseResolver, SuplementoDesgloseService],
  exports: [SuplementoDesgloseService]
})
export class SuplementoDesgloseModule {}
