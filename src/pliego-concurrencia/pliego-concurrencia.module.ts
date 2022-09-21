import { Module } from '@nestjs/common';
import { PliegoConcurrenciaService } from './pliego-concurrencia.service';
import { PliegoConcurrenciaResolver } from './pliego-concurrencia.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PliegoConcurrencia } from 'src/models/entities/PliegoConcurrencia.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    PliegoConcurrencia
  ])],
  providers: [PliegoConcurrenciaResolver, PliegoConcurrenciaService],
  exports: [PliegoConcurrenciaService]
})
export class PliegoConcurrenciaModule {}
