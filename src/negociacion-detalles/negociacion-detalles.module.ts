import { Module } from '@nestjs/common';
import { NegociacionDetallesService } from './negociacion-detalles.service';
import { NegociacionDetallesResolver } from './negociacion-detalles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociacionDetalles } from 'src/models/entities/NegociacionDetalles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    NegociacionDetalles
  ])],
  providers: [NegociacionDetallesResolver, NegociacionDetallesService]
})
export class NegociacionDetallesModule {}
