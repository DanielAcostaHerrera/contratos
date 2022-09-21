import { Module } from '@nestjs/common';
import { SolicitudCodificacionService } from './solicitud-codificacion.service';
import { SolicitudCodificacionResolver } from './solicitud-codificacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudCodificacion } from 'src/models/entities/SolicitudCodificacion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SolicitudCodificacion
  ])],
  providers: [SolicitudCodificacionResolver, SolicitudCodificacionService],
  exports: [SolicitudCodificacionService]
})
export class SolicitudCodificacionModule {}
