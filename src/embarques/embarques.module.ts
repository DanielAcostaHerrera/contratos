import { Module } from '@nestjs/common';
import { EmbarquesService } from './embarques.service';
import { EmbarquesResolver } from './embarques.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { EjecutivoModule } from 'src/ejecutivo/ejecutivo.module';
import { CompaniasNavierasModule } from 'src/companias-navieras/companias-navieras.module';
import { ContratoDesgloseModule } from 'src/contrato-desglose/contrato-desglose.module';
import { SuplementoChangeModule } from 'src/suplemento-change/suplemento-change.module';
import { SuplementoEmbarquesModule } from 'src/suplemento-embarques/suplemento-embarques.module';
import { SuplementoDesgloseModule } from 'src/suplemento-desglose/suplemento-desglose.module';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { SuplementoClausulasModule } from 'src/suplemento-clausulas/suplemento-clausulas.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Embarques
  ]),EjecutivoModule,CompaniasNavierasModule,ContratoDesgloseModule,SuplementoChangeModule,SuplementoEmbarquesModule,
  SuplementoDesgloseModule,SuplementoResumenModule,SuplementoClausulasModule],
  providers: [EmbarquesResolver, EmbarquesService],
  exports: [EmbarquesService]
})
export class EmbarquesModule {}
