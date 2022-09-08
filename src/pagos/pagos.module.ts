import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosResolver } from './pagos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagos } from 'src/models/entities/Pagos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Pagos
  ])],
  providers: [PagosResolver, PagosService],
  exports: [PagosService]
})
export class PagosModule {}
