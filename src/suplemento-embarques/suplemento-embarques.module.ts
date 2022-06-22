import { Module } from '@nestjs/common';
import { SuplementoEmbarquesService } from './suplemento-embarques.service';
import { SuplementoEmbarquesResolver } from './suplemento-embarques.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoEmbarques } from 'src/models/entities/SuplementoEmbarques.entity';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { ContratosModule } from 'src/contratos/contratos.module';
import { CompaniasNavierasModule } from 'src/companias-navieras/companias-navieras.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoEmbarques
  ]),SuplementoResumenModule,ContratosModule,CompaniasNavierasModule],
  providers: [SuplementoEmbarquesResolver, SuplementoEmbarquesService],
  exports: [SuplementoEmbarquesService]
})
export class SuplementoEmbarquesModule {}
