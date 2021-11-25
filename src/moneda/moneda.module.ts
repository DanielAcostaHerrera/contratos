import { Module } from '@nestjs/common';
import { MonedaService } from './moneda.service';
import { MonedaResolver } from './moneda.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monedas } from '../models/entities/Monedas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Monedas
  ])],
  providers: [MonedaService, MonedaResolver]
})
export class MonedaModule {}
