import { Module } from '@nestjs/common';
import { SuplementoClausulasService } from './suplemento-clausulas.service';
import { SuplementoClausulasResolver } from './suplemento-clausulas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoClausulas } from 'src/models/entities/SuplementoClausulas.entity';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { ContratoClausulaModule } from 'src/contrato-clausulas/contrato-clausulas.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoClausulas
  ]),SuplementoResumenModule,ContratoClausulaModule],
  providers: [SuplementoClausulasResolver, SuplementoClausulasService],
  exports: [SuplementoClausulasService]
})
export class SuplementoClausulasModule {}
