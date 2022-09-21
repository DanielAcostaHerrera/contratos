import { Module } from '@nestjs/common';
import { PliegoConcurrenciaResumenService } from './pliego-concurrencia-resumen.service';
import { PliegoConcurrenciaResumenResolver } from './pliego-concurrencia-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    PliegoConcurrenciaResumen
  ])],
  providers: [PliegoConcurrenciaResumenResolver, PliegoConcurrenciaResumenService],
  exports: [PliegoConcurrenciaResumenService]
})
export class PliegoConcurrenciaResumenModule {}
