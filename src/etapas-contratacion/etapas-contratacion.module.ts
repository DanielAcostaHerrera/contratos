import { Module } from '@nestjs/common';
import { EtapasContratacionService } from './etapas-contratacion.service';
import { EtapasContratacionResolver } from './etapas-contratacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    EtapasContratacion
  ])],
  providers: [EtapasContratacionResolver, EtapasContratacionService],
  exports: [EtapasContratacionService]
})
export class EtapasContratacionModule {}
