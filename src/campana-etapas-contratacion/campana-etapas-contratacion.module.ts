import { Module } from '@nestjs/common';
import { CampanaEtapasContratacionService } from './campana-etapas-contratacion.service';
import { CampanaEtapasContratacionResolver } from './campana-etapas-contratacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampanaEtapasContratacion } from 'src/models/entities/CampanaEtapasContratacion.entity';
import { CampanasModule } from 'src/campanas/campanas.module';
import { EtapasContratacionModule } from 'src/etapas-contratacion/etapas-contratacion.module';
import { PaisesModule } from 'src/paises/paises.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    CampanaEtapasContratacion
  ]),CampanasModule,EtapasContratacionModule,PaisesModule],
  providers: [CampanaEtapasContratacionResolver, CampanaEtapasContratacionService],
  exports: [CampanaEtapasContratacionService]
})
export class CampanaEtapasContratacionModule {}
