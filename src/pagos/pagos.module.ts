import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosResolver } from './pagos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagos } from 'src/models/entities/Pagos.entity';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { FormasPagoModule } from 'src/formas-pago/formas-pago.module';
import { PagosApartirDeModule } from 'src/pagos-apartir-de/pagos-apartir-de.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Pagos
  ]),EmbarquesModule,FormasPagoModule,PagosApartirDeModule],
  providers: [PagosResolver, PagosService],
  exports: [PagosService]
})
export class PagosModule {}
