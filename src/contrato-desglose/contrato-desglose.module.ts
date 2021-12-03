import { Module } from '@nestjs/common';
import { ContratoDesgloseService } from './contrato-desglose.service';
import { ContratoDesgloseResolver } from './contrato-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [ContratoDesglose]
  )],
  providers: [ContratoDesgloseResolver, ContratoDesgloseService]
})
export class ContratoDesgloseModule {}
