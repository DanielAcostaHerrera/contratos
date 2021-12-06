import { Module } from '@nestjs/common';
import { DocumentacionContratoService } from './documentacion-contrato.service';
import { DocumentacionContratoResolver } from './documentacion-contrato.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentacionContrato } from 'src/models/entities/DocumentacionContrato.entity';
import { DocumentacionModule } from 'src/documentacion/documentacion.module';
import { ContratosModule } from 'src/contratos/contratos.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentacionContrato]
  ),DocumentacionModule,ContratosModule],
  providers: [DocumentacionContratoResolver, DocumentacionContratoService],
  exports: [DocumentacionContratoService]
})
export class DocumentacionContratoModule {}
