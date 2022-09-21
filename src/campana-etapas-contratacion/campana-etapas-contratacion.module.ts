import { Module } from '@nestjs/common';
import { CampanaEtapasContratacionService } from './campana-etapas-contratacion.service';
import { CampanaEtapasContratacionResolver } from './campana-etapas-contratacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampanaEtapasContratacion } from 'src/models/entities/CampanaEtapasContratacion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    CampanaEtapasContratacion
  ])],
  providers: [CampanaEtapasContratacionResolver, CampanaEtapasContratacionService],
  exports: [CampanaEtapasContratacionService]
})
export class CampanaEtapasContratacionModule {}
