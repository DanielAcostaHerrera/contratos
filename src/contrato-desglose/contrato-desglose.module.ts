import { Module } from '@nestjs/common';
import { ContratoDesgloseService } from './contrato-desglose.service';
import { ContratoDesgloseResolver } from './contrato-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { ReferenciasModule } from 'src/referencias/referencias.module';
import { UnidadMedidaModule } from 'src/unidad-medida/unidad-medida.module';
import { CodigosParaLaVentaModule } from 'src/codigos-para-la-venta/codigos-para-la-venta.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [ContratoDesglose]
  ),ReferenciasModule,UnidadMedidaModule,CodigosParaLaVentaModule],
  providers: [ContratoDesgloseResolver, ContratoDesgloseService],
  exports: [ContratoDesgloseService]
})
export class ContratoDesgloseModule {}
