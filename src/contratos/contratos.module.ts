import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosResolver } from './contratos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { BasesGeneralesModule } from 'src/bases-generales/bases-generales.module';
import { TipoContratoModule } from 'src/tipo-contrato/tipo-contrato.module';
import { ProformasModule } from 'src/proformas/proformas.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Contratos]
  ),BasesGeneralesModule,TipoContratoModule,ProformasModule],
  providers: [ContratosResolver, ContratosService],
  exports: [ContratosService]
})
export class ContratosModule {}
