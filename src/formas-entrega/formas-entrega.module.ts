import { Module } from '@nestjs/common';
import { FormasEntregaService } from './formas-entrega.service';
import { FormasEntregaResolver } from './formas-entrega.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    FormasEntrega
  ])],
  providers: [FormasEntregaResolver, FormasEntregaService],
  exports: [FormasEntregaService]
})
export class FormasEntregaModule {}
