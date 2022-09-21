import { Module } from '@nestjs/common';
import { EjecutivoService } from './ejecutivo.service';
import { EjecutivoResolver } from './ejecutivo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Ejecutivos
  ])],
  providers: [EjecutivoResolver, EjecutivoService],
  exports: [EjecutivoService]
})
export class EjecutivoModule {}
