import { Module } from '@nestjs/common';
import { FichaCompraAtributosService } from './ficha-compra-atributos.service';
import { FichaCompraAtributosResolver } from './ficha-compra-atributos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaCompraAtributos } from 'src/models/entities/FichaCompraAtributos.entity';
import { FichaCompraDetalleModule } from 'src/ficha-compra-detalle/ficha-compra-detalle.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    FichaCompraAtributos
  ]),FichaCompraDetalleModule],
  providers: [FichaCompraAtributosResolver, FichaCompraAtributosService],
  exports: [FichaCompraAtributosService]
})
export class FichaCompraAtributosModule {}
