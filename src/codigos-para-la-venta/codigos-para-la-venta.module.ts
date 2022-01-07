import { Module } from '@nestjs/common';
import { CodigosParaLaVentaService } from './codigos-para-la-venta.service';
import { CodigosParaLaVentaResolver } from './codigos-para-la-venta.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [CodigosParaLaVenta]
  )],
  providers: [CodigosParaLaVentaResolver, CodigosParaLaVentaService],
  exports: [CodigosParaLaVentaService]
})
export class CodigosParaLaVentaModule {}
