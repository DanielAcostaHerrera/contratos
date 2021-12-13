import { Module } from '@nestjs/common';
import { SuplementoEmbarquesService } from './suplemento-embarques.service';
import { SuplementoEmbarquesResolver } from './suplemento-embarques.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoEmbarques } from 'src/models/entities/SuplementoEmbarques.entity';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { ContratosModule } from 'src/contratos/contratos.module';
import { PuertosModule } from 'src/puertos/puertos.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoEmbarques
  ]),SuplementoResumenModule,EmbarquesModule,ContratosModule,PuertosModule],
  providers: [SuplementoEmbarquesResolver, SuplementoEmbarquesService],
  exports: [SuplementoEmbarquesService]
})
export class SuplementoEmbarquesModule {}
