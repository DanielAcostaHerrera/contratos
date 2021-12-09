import { Module } from '@nestjs/common';
import { FormasPagoService } from './formas-pago.service';
import { FormasPagoResolver } from './formas-pago.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormasPago } from 'src/models/entities/FormasPago.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    FormasPago
  ])],
  providers: [FormasPagoResolver, FormasPagoService],
  exports: [FormasPagoService]
})
export class FormasPagoModule {}
