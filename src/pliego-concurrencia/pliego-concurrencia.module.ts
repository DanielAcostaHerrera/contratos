import { Module } from '@nestjs/common';
import { PliegoConcurrenciaService } from './pliego-concurrencia.service';
import { PliegoConcurrenciaResolver } from './pliego-concurrencia.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PliegoConcurrencia } from 'src/models/entities/PliegoConcurrencia.entity';
import { SolicitudOfertasModule } from 'src/solicitud-ofertas/solicitud-ofertas.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    PliegoConcurrencia
  ]),SolicitudOfertasModule],
  providers: [PliegoConcurrenciaResolver, PliegoConcurrenciaService],
  exports: [PliegoConcurrenciaService]
})
export class PliegoConcurrenciaModule {}
