import { Module } from '@nestjs/common';
import { DetalleCircularesAltasService } from './detalle-circulares-altas.service';
import { DetalleCircularesAltasResolver } from './detalle-circulares-altas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCircularesAltas } from 'src/modelsMercurio/entities/DetalleCircularesAltas.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DetalleCircularesAltas]
  )],
  providers: [DetalleCircularesAltasResolver, DetalleCircularesAltasService],
  exports: [DetalleCircularesAltasService]
})
export class DetalleCircularesAltasModule {}
