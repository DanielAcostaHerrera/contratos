import { Module } from '@nestjs/common';
import { BasesGeneralesClausulasService } from './bases-generales-clausulas.service';
import { BasesGeneralesClausulasResolver } from './bases-generales-clausulas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { TiposDeClausulasModule } from 'src/tipos-de-clausulas/tipos-de-clausulas.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesGeneralesClausulas
  ])],
  providers: [BasesGeneralesClausulasResolver, BasesGeneralesClausulasService],
  exports: [BasesGeneralesClausulasService]
})
export class BasesGeneralesClausulasModule {}
