import { Module } from '@nestjs/common';
import { SuplementoClausulasService } from './suplemento-clausulas.service';
import { SuplementoClausulasResolver } from './suplemento-clausulas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoClausulas } from 'src/models/entities/SuplementoClausulas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoClausulas
  ])],
  providers: [SuplementoClausulasResolver, SuplementoClausulasService],
  exports: [SuplementoClausulasService]
})
export class SuplementoClausulasModule {}
