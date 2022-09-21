import { Module } from '@nestjs/common';
import { ContratoMarcoService } from './contrato-marco.service';
import { ContratoMarcoResolver } from './contrato-marco.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoMarco } from '../models/entities/ContratoMarco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ContratoMarco
  ])],
  providers: [ContratoMarcoResolver, ContratoMarcoService],
  exports: [ContratoMarcoService]
})
export class ContratoMarcoModule {}
