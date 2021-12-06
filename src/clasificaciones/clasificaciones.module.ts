import { Module } from '@nestjs/common';
import { ClasificacionesService } from './clasificaciones.service';
import { ClasificacionesResolver } from './clasificaciones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clasificaciones } from 'src/models/entities/Clasificaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Clasificaciones]
  )],
  providers: [ClasificacionesResolver, ClasificacionesService],
  exports: [ClasificacionesService]
})
export class ClasificacionesModule {}
