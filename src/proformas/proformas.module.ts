import { Module } from '@nestjs/common';
import { ProformasService } from './proformas.service';
import { ProformasResolver } from './proformas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { TipoContratoModule } from 'src/tipo-contrato/tipo-contrato.module';
import { IncotermModule } from 'src/incoterm/incoterm.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Proformas
  ]),TipoContratoModule,IncotermModule],
  providers: [ProformasResolver, ProformasService],
  exports: [ProformasService]
})
export class ProformasModule {}
