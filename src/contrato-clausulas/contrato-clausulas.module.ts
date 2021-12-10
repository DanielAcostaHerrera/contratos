import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { ContratosModule } from 'src/contratos/contratos.module';
import { ContratoClausulasResolver } from './contrato-clausulas.resolver';
import { ContratoClausulaService } from './contrato-clausulas.service';

@Module({
  imports: [TypeOrmModule.forFeature(
    [ContratoClausulas]
  ),ContratosModule],
  providers: [ContratoClausulasResolver, ContratoClausulaService],
  exports: [ContratoClausulaService]
})
export class ContratoClausulaModule {}
