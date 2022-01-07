import { Module } from '@nestjs/common';
import { DetalleDeCircularesAltasService } from './detalle-de-circulares-altas.service';
import { DetalleDeCircularesAltasResolver } from './detalle-de-circulares-altas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleDeCircularesAltas } from 'src/modelsMercurio/entities/DetalleDeCircularesAltas.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DetalleDeCircularesAltas]
  )],
  providers: [DetalleDeCircularesAltasResolver, DetalleDeCircularesAltasService],
  exports: [DetalleDeCircularesAltasService]
})
export class DetalleDeCircularesAltasModule {}
