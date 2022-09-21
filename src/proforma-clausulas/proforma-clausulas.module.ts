import { Module } from '@nestjs/common';
import { ProformaClausulasService } from './proforma-clausulas.service';
import { ProformaClausulasResolver } from './proforma-clausulas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProformaClausulas } from 'src/models/entities/ProformaClausulas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProformaClausulas
  ])],
  providers: [ProformaClausulasResolver, ProformaClausulasService],
  exports: [ProformaClausulasService]
})
export class ProformaClausulasModule {}
