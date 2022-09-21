import { Module } from '@nestjs/common';
import { SuplementoResumenService } from './suplemento-resumen.service';
import { SuplementoResumenResolver } from './suplemento-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoResumen
  ])],
  providers: [SuplementoResumenResolver, SuplementoResumenService],
  exports: [SuplementoResumenService]
})
export class SuplementoResumenModule {}
