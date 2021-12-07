import { Module } from '@nestjs/common';
import { DatosEntidadService } from './datos-entidad.service';
import { DatosEntidadResolver } from './datos-entidad.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosEntidad } from 'src/models/entities/DatosEntidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DatosEntidad]
  )],
  providers: [DatosEntidadResolver, DatosEntidadService],
  exports: [DatosEntidadService]
})
export class DatosEntidadModule {}
