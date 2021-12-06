import { Module } from '@nestjs/common';
import { NegociacionProveedoresService } from './negociacion-proveedores.service';
import { NegociacionProveedoresResolver } from './negociacion-proveedores.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociacionProveedores } from 'src/models/entities/NegociacionProveedores.entity';
import { NegociacionResumenModule } from 'src/negociacion-resumen/negociacion-resumen.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    NegociacionProveedores
  ]),NegociacionResumenModule],
  providers: [NegociacionProveedoresResolver, NegociacionProveedoresService],
  exports: [NegociacionProveedoresService]
})
export class NegociacionProveedoresModule {}
