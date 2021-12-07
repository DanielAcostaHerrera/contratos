import { Module } from '@nestjs/common';
import { TiemposTravesiaService } from './tiempos-travesia.service';
import { TiemposTravesiaResolver } from './tiempos-travesia.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiemposTravesia } from 'src/models/entities/TiemposTravesia.entity';
import { EtapasContratacionModule } from 'src/etapas-contratacion/etapas-contratacion.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    TiemposTravesia
  ]),EtapasContratacionModule],
  providers: [TiemposTravesiaResolver, TiemposTravesiaService],
  exports: [TiemposTravesiaService]
})
export class TiemposTravesiaModule {}
