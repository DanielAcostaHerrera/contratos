import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { ContratoClausulasResolver } from './contrato-clausulas.resolver';
import { ContratoClausulaService } from './contrato-clausulas.service';

@Module({
  imports: [TypeOrmModule.forFeature(
    [ContratoClausulas]
  )],
  providers: [ContratoClausulasResolver, ContratoClausulaService],
  exports: [ContratoClausulaService]
})
export class ContratoClausulaModule {}
