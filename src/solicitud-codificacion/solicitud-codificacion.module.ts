import { Module } from '@nestjs/common';
import { SolicitudCodificacionService } from './solicitud-codificacion.service';
import { SolicitudCodificacionResolver } from './solicitud-codificacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudCodificacion } from 'src/models/entities/SolicitudCodificacion.entity';
import { PliegoConcurrenciaResumenModule } from 'src/pliego-concurrencia-resumen/pliego-concurrencia-resumen.module';
import { EmbalajesModule } from 'src/embalajes/embalajes.module';
import { UnidadMedidaModule } from 'src/unidad-medida/unidad-medida.module';
import { ReferenciasModule } from 'src/referencias/referencias.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SolicitudCodificacion
  ]),PliegoConcurrenciaResumenModule,EmbalajesModule,UnidadMedidaModule,ReferenciasModule],
  providers: [SolicitudCodificacionResolver, SolicitudCodificacionService],
  exports: [SolicitudCodificacionService]
})
export class SolicitudCodificacionModule {}
