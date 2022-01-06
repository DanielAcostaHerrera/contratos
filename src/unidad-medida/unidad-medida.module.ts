import { Module } from '@nestjs/common';
import { UnidadMedidaService } from './unidad-medida.service';
import { UnidadMedidaResolver } from './unidad-medida.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    UnidadMedida
  ])],
  providers: [UnidadMedidaResolver, UnidadMedidaService],
  exports: [UnidadMedidaService]
})
export class UnidadMedidaModule {}
