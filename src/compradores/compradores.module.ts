import { Module } from '@nestjs/common';
import { CompradoresService } from './compradores.service';
import { CompradoresResolver } from './compradores.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { DatosEntidadModule } from 'src/datos-entidad/datos-entidad.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Compradores]
  ),DatosEntidadModule],
  providers: [CompradoresResolver, CompradoresService],
  exports: [CompradoresService]
})
export class CompradoresModule {}
