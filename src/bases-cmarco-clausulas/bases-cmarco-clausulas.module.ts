import { Module } from '@nestjs/common';
import { BasesCmarcoClausulasService } from './bases-cmarco-clausulas.service';
import { BasesCmarcoClausulasResolver } from './bases-cmarco-clausulas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesCMarcoClausulas } from 'src/models/entities/BasesCMarcoClausulas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesCMarcoClausulas
  ])],
  providers: [BasesCmarcoClausulasResolver, BasesCmarcoClausulasService]
})
export class BasesCmarcoClausulasModule {}
