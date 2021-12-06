import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { GruposDeComprasService } from './grupos-de-compras.service';
import { GruposDeComprasResolver } from './grupos-de-compras.resolver';

@Module({
  imports: [TypeOrmModule.forFeature(
    [GruposDeCompras]
  )],
  providers: [GruposDeComprasResolver, GruposDeComprasService],
  exports: [GruposDeComprasService]
})
export class GruposDeComprasModule {}
