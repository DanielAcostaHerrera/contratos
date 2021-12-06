import { Module } from '@nestjs/common';
import { ContratoDesgloseService } from './contrato-desglose.service';
import { ContratoDesgloseResolver } from './contrato-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { ContratosModule } from 'src/contratos/contratos.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [ContratoDesglose]
  ),ContratosModule],
  providers: [ContratoDesgloseResolver, ContratoDesgloseService],
  exports: [ContratoDesgloseService]
})
export class ContratoDesgloseModule {}
