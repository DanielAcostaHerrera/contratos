import { Module } from '@nestjs/common';
import { SolicitudContratacionService } from './solicitud-contratacion.service';
import { SolicitudContratacionResolver } from './solicitud-contratacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudContratacion } from 'src/models/entities/SolicitudContratacion.entity';
import { NegociacionResumenModule } from 'src/negociacion-resumen/negociacion-resumen.module';
import { CompradoresModule } from 'src/compradores/compradores.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SolicitudContratacion
  ]),NegociacionResumenModule,CompradoresModule],
  providers: [SolicitudContratacionResolver, SolicitudContratacionService],
  exports: [SolicitudContratacionService]
})
export class SolicitudContratacionModule {}
