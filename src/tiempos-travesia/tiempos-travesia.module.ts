import { Module } from '@nestjs/common';
import { TiemposTravesiaService } from './tiempos-travesia.service';
import { TiemposTravesiaResolver } from './tiempos-travesia.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiemposTravesia } from 'src/models/entities/TiemposTravesia.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    TiemposTravesia
  ])],
  providers: [TiemposTravesiaResolver, TiemposTravesiaService],
  exports: [TiemposTravesiaService]
})
export class TiemposTravesiaModule {}
