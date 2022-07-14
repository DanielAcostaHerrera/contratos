import { Module } from '@nestjs/common';
import { ProformaClausulasService } from './proforma-clausulas.service';
import { ProformaClausulasResolver } from './proforma-clausulas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';
import { TiposDeClausulasModule } from 'src/tipos-de-clausulas/tipos-de-clausulas.module';
import { TipoContratoModule } from 'src/tipo-contrato/tipo-contrato.module';
import { IncotermModule } from 'src/incoterm/incoterm.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProformaClausulas
  ]),TiposDeClausulasModule,TipoContratoModule,IncotermModule],
  providers: [ProformaClausulasResolver, ProformaClausulasService],
  exports: [ProformaClausulasService]
})
export class ProformaClausulasModule {}
