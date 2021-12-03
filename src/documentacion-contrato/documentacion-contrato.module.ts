import { Module } from '@nestjs/common';
import { DocumentacionContratoService } from './documentacion-contrato.service';
import { DocumentacionContratoResolver } from './documentacion-contrato.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentacionContrato } from 'src/models/entities/DocumentacionContrato.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentacionContrato]
  )],
  providers: [DocumentacionContratoResolver, DocumentacionContratoService]
})
export class DocumentacionContratoModule {}
