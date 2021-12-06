import { Module } from '@nestjs/common';
import { EjecutivoService } from './ejecutivo.service';
import { EjecutivoResolver } from './ejecutivo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { CargoModule } from 'src/cargo/cargo.module';
import { GruposDeComprasModule } from 'src/grupos-de-compras/grupos-de-compras.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    Ejecutivos
  ]),CargoModule,GruposDeComprasModule],
  providers: [EjecutivoResolver, EjecutivoService],
  exports: [EjecutivoService]
})
export class EjecutivoModule {}
