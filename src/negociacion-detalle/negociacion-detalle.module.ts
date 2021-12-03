import { Module } from '@nestjs/common';
import { NegociacionDetalleService } from './negociacion-detalle.service';
import { NegociacionDetalleResolver } from './negociacion-detalle.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociacionDetalle } from 'src/models/entities/NegociacionDetalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    NegociacionDetalle
  ])],
  providers: [NegociacionDetalleResolver, NegociacionDetalleService]
})
export class NegociacionDetalleModule {}
