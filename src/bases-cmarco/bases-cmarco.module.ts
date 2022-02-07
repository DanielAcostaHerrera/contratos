import { forwardRef, Module } from '@nestjs/common';
import { BasesCmarcoService } from './bases-cmarco.service';
import { BasesCmarcoResolver } from './bases-cmarco.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { PuertosModule } from 'src/puertos/puertos.module';
import { ProformasModule } from 'src/proformas/proformas.module';
import { CompradoresModule } from 'src/compradores/compradores.module';
import { BasesGeneralesModule } from 'src/bases-generales/bases-generales.module';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesCMarco,  
  ]),PuertosModule,ProformasModule, CompradoresModule, BasesGeneralesModule, ProveedoresModule,LogsModule],
  providers: [BasesCmarcoResolver, BasesCmarcoService],
  exports: [BasesCmarcoService]
})
export class BasesCmarcoModule {}
