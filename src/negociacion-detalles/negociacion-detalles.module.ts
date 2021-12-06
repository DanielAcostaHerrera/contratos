import { Module } from '@nestjs/common';
import { NegociacionDetallesService } from './negociacion-detalles.service';
import { NegociacionDetallesResolver } from './negociacion-detalles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociacionDetalles } from 'src/models/entities/NegociacionDetalles.entity';
import { NegociacionResumenModule } from 'src/negociacion-resumen/negociacion-resumen.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    NegociacionDetalles
  ]),NegociacionResumenModule],
  providers: [NegociacionDetallesResolver, NegociacionDetallesService],
  exports: [NegociacionDetallesService]
})
export class NegociacionDetallesModule {}
