import { Module } from '@nestjs/common';
import { DocumentacionService } from './documentacion.service';
import { DocumentacionResolver } from './documentacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentacion } from 'src/models/entities/Documentacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Documentacion]
  )],
  providers: [DocumentacionResolver, DocumentacionService]
})
export class DocumentacionModule {}
