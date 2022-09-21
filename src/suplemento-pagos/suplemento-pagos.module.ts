import { Module } from '@nestjs/common';
import { SuplementoPagosService } from './suplemento-pagos.service';
import { SuplementoPagosResolver } from './suplemento-pagos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoPagos } from 'src/models/entities/SuplementoPagos.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoPagos
  ])],
  providers: [SuplementoPagosResolver, SuplementoPagosService],
  exports: [SuplementoPagosService]
})
export class SuplementoPagosModule {}
