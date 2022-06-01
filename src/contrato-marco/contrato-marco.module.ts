import { Module } from '@nestjs/common';
import { ContratoMarcoService } from './contrato-marco.service';
import { ContratoMarcoResolver } from './contrato-marco.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoMarco } from '../models/entities/ContratoMarco.entity';
import { ProveedoresModule } from '../proveedores/proveedores.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    ContratoMarco
  ]),ProveedoresModule],
  providers: [ContratoMarcoResolver, ContratoMarcoService],
  exports: [ContratoMarcoService]
})
export class ContratoMarcoModule {}
