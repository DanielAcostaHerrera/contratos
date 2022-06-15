import { Module } from '@nestjs/common';
import { FacturaDesgloseService } from './factura-desglose.service';
import { FacturaDesgloseResolver } from './factura-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaDesglose } from 'src/models/entities/FacturaDesglose.entity';
import { ReferenciasModule } from 'src/referencias/referencias.module';
import { PaisesModule } from 'src/paises/paises.module';
import { CodigosParaLaVentaModule } from 'src/codigos-para-la-venta/codigos-para-la-venta.module';


@Module({
  imports:[TypeOrmModule.forFeature([
    FacturaDesglose
  ]),CodigosParaLaVentaModule,ReferenciasModule,PaisesModule],
  providers: [FacturaDesgloseResolver, FacturaDesgloseService],
  exports: [FacturaDesgloseService]
  
})
export class FacturaDesgloseModule {}
