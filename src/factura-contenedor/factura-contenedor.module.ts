import { Module } from '@nestjs/common';
import { FacturaContenedorService } from './factura-contenedor.service';
import { FacturaContenedorResolver } from './factura-contenedor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaContenedor } from 'src/models/entities/FacturaContenedor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    FacturaContenedor
  ])],
  providers: [FacturaContenedorResolver, FacturaContenedorService],
  exports: [FacturaContenedorService]
})
export class FacturaContenedorModule {}
