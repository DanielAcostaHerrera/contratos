import { Module } from '@nestjs/common';
import { FacturaDesgloseService } from './factura-desglose.service';
import { FacturaDesgloseResolver } from './factura-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaDesglose } from 'src/models/entities/FacturaDesglose.entity';
import { FacturaResumenModule } from 'src/factura-resumen/factura-resumen.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    FacturaDesglose
  ]),FacturaResumenModule],
  providers: [FacturaDesgloseResolver, FacturaDesgloseService],
  exports: [FacturaDesgloseService]
  
})
export class FacturaDesgloseModule {}
