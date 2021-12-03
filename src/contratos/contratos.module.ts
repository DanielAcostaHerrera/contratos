import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosResolver } from './contratos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contratos } from 'src/models/entities/Contratos.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Contratos]
  )],
  providers: [ContratosResolver, ContratosService]
})
export class ContratosModule {}
