import { Module } from '@nestjs/common';
import { NegociacionResumenService } from './negociacion-resumen.service';
import { NegociacionResumenResolver } from './negociacion-resumen.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { LogsModule } from 'src/logs/logs.module';
import { NegociacionProveedoresModule } from 'src/negociacion-proveedores/negociacion-proveedores.module';
import { ContratoMarcoModule } from 'src/contrato-marco/contrato-marco.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    NegociacionResumen
  ]),LogsModule,NegociacionProveedoresModule,ContratoMarcoModule],
  providers: [NegociacionResumenResolver, NegociacionResumenService],
  exports: [NegociacionResumenService]
})
export class NegociacionResumenModule {}
