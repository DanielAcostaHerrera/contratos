import { Module } from '@nestjs/common';
import { TipoContratoService } from './tipo-contrato.service';
import { TipoContratoResolver } from './tipo-contrato.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    TipoContrato
  ])],
  providers: [TipoContratoResolver, TipoContratoService]
})
export class TipoContratoModule {}
