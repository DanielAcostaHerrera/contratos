import { forwardRef, Module } from '@nestjs/common';
import { BasesCmarcoClausulasService } from './bases-cmarco-clausulas.service';
import { BasesCmarcoClausulasResolver } from './bases-cmarco-clausulas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesCMarcoClausulas } from 'src/models/entities/BasesCMarcoClausulas.entity';
import { BasesCmarcoModule } from 'src/bases-cmarco/bases-cmarco.module';
import { TiposDeClausulasModule } from 'src/tipos-de-clausulas/tipos-de-clausulas.module';
import { ProformaClausulasModule } from 'src/proforma-clausulas/proforma-clausulas.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesCMarcoClausulas
  ]),BasesCmarcoModule, TiposDeClausulasModule, ProformaClausulasModule],
  providers: [BasesCmarcoClausulasResolver, BasesCmarcoClausulasService],
  exports: [BasesCmarcoClausulasService]
})
export class BasesCmarcoClausulasModule {}
