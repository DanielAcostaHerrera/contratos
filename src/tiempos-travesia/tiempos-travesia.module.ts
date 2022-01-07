import { Module } from '@nestjs/common';
import { TiemposTravesiaService } from './tiempos-travesia.service';
import { TiemposTravesiaResolver } from './tiempos-travesia.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiemposTravesia } from 'src/models/entities/TiemposTravesia.entity';
import { EtapasContratacionModule } from 'src/etapas-contratacion/etapas-contratacion.module';
import { PaisesModule } from 'src/paises/paises.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    TiemposTravesia
  ]),EtapasContratacionModule,PaisesModule],
  providers: [TiemposTravesiaResolver, TiemposTravesiaService],
  exports: [TiemposTravesiaService]
})
export class TiemposTravesiaModule {}
