import { Module } from '@nestjs/common';
import { FacturaContenedorService } from './factura-contenedor.service';
import { FacturaContenedorResolver } from './factura-contenedor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaContenedor } from 'src/models/entities/FacturaContenedor.entity';
import { FacturaResumenModule } from 'src/factura-resumen/factura-resumen.module';
import { ContenedoresModule } from 'src/contenedores/contenedores.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    FacturaContenedor
  ]),FacturaResumenModule,ContenedoresModule],
  providers: [FacturaContenedorResolver, FacturaContenedorService],
  exports: [FacturaContenedorService]
})
export class FacturaContenedorModule {}
