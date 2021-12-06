import { Module } from '@nestjs/common';
import { DocumentacionService } from './documentacion.service';
import { DocumentacionResolver } from './documentacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentacion } from 'src/models/entities/Documentacion.entity';
import { TiposDocumentoModule } from 'src/tipos-documento/tipos-documento.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Documentacion]
  ),TiposDocumentoModule],
  providers: [DocumentacionResolver, DocumentacionService],
  exports: [DocumentacionService] 
})
export class DocumentacionModule {}
