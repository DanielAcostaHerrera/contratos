import { Module } from '@nestjs/common';
import { TiposDeClausulasService } from './tipos-de-clausulas.service';
import { TiposDeClausulasResolver } from './tipos-de-clausulas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    TiposDeClausulas
  ])],
  providers: [TiposDeClausulasResolver, TiposDeClausulasService]
})
export class TiposDeClausulasModule {}
