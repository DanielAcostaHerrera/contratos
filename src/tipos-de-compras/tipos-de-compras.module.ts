import { Module } from '@nestjs/common';
import { TiposDeComprasService } from './tipos-de-compras.service';
import { TiposDeComprasResolver } from './tipos-de-compras.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposDeCompras } from 'src/models/entities/TiposDeCompras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    TiposDeCompras
  ])],
  providers: [TiposDeComprasResolver, TiposDeComprasService],
  exports: [TiposDeComprasService]
})
export class TiposDeComprasModule {}
