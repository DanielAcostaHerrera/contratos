import { Module } from '@nestjs/common';
import { SolicitudOfertasService } from './solicitud-ofertas.service';
import { SolicitudOfertasResolver } from './solicitud-ofertas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { SolicitudContratacionModule } from 'src/solicitud-contratacion/solicitud-contratacion.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SolicitudOfertas
  ]),SolicitudContratacionModule],
  providers: [SolicitudOfertasResolver, SolicitudOfertasService],
  exports: [SolicitudOfertasService]
})
export class SolicitudOfertasModule {}
