import { Module } from '@nestjs/common';
import { BasesGeneralesService } from './bases-generales.service';
import { BasesGeneralesResolver } from './bases-generales.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { ClasificacionesModule } from 'src/clasificaciones/clasificaciones.module';
import { TipoContratoModule } from 'src/tipo-contrato/tipo-contrato.module';
import { IncotermModule } from 'src/incoterm/incoterm.module';
import { ProformasModule } from 'src/proformas/proformas.module';
import { CompradoresModule } from 'src/compradores/compradores.module';
import { PaisesModule } from 'src/paises/paises.module';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesGenerales
  ]),ClasificacionesModule,TipoContratoModule,IncotermModule,ProformasModule,CompradoresModule,PaisesModule,ProveedoresModule,LogsModule],
  providers: [BasesGeneralesResolver, BasesGeneralesService],
  exports: [BasesGeneralesService]
})
export class BasesGeneralesModule {}
