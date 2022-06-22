import { Module } from '@nestjs/common';
import { EmbarquesService } from './embarques.service';
import { EmbarquesResolver } from './embarques.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { EjecutivoModule } from 'src/ejecutivo/ejecutivo.module';
import { CompaniasNavierasModule } from 'src/companias-navieras/companias-navieras.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Embarques
  ]),EjecutivoModule,CompaniasNavierasModule],
  providers: [EmbarquesResolver, EmbarquesService],
  exports: [EmbarquesService]
})
export class EmbarquesModule {}
