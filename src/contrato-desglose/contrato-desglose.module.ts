import { Module } from '@nestjs/common';
import { ContratoDesgloseService } from './contrato-desglose.service';
import { ContratoDesgloseResolver } from './contrato-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { EmbarquesModule } from 'src/embarques/embarques.module';

@Module({
  imports: [TypeOrmModule.forFeature(
    [ContratoDesglose]
  ),EmbarquesModule],
  providers: [ContratoDesgloseResolver, ContratoDesgloseService],
  exports: [ContratoDesgloseService]
})
export class ContratoDesgloseModule {}
