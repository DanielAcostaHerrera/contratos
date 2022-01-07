import { Module } from '@nestjs/common';
import { ContratoDesgloseService } from './contrato-desglose.service';
import { ContratoDesgloseResolver } from './contrato-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { ReferenciasModule } from 'src/referencias/referencias.module';
import { UnidadMedidaModule } from 'src/unidad-medida/unidad-medida.module';
import { DetalleDeCircularesAltasModule } from 'src/detalle-de-circulares-altas/detalle-de-circulares-altas.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [ContratoDesglose]
  ),EmbarquesModule,ReferenciasModule,UnidadMedidaModule,DetalleDeCircularesAltasModule],
  providers: [ContratoDesgloseResolver, ContratoDesgloseService],
  exports: [ContratoDesgloseService]
})
export class ContratoDesgloseModule {}
