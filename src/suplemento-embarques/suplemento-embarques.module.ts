import { Module } from '@nestjs/common';
import { SuplementoEmbarquesService } from './suplemento-embarques.service';
import { SuplementoEmbarquesResolver } from './suplemento-embarques.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoEmbarques } from 'src/models/entities/SuplementoEmbarques.entity';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { ContratosModule } from 'src/contratos/contratos.module';
import { PuertosModule } from 'src/puertos/puertos.module';
import { CompaniasNavierasModule } from 'src/companias-navieras/companias-navieras.module';
import { PuertoEmbarqueModule } from 'src/puerto-embarque/puerto-embarque.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoEmbarques
  ]),SuplementoResumenModule,EmbarquesModule,ContratosModule,PuertosModule,CompaniasNavierasModule,PuertoEmbarqueModule],
  providers: [SuplementoEmbarquesResolver, SuplementoEmbarquesService],
  exports: [SuplementoEmbarquesService]
})
export class SuplementoEmbarquesModule {}
