import { Module } from '@nestjs/common';
import { NegociacionResumenService } from './negociacion-resumen.service';
import { NegociacionResumenResolver } from './negociacion-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    NegociacionResumen
  ])],
  providers: [NegociacionResumenResolver, NegociacionResumenService]
})
export class NegociacionResumenModule {}
