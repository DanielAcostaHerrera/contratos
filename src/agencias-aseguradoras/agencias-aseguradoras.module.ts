import { Module } from '@nestjs/common';
import { AgenciasAseguradorasService } from './agencias-aseguradoras.service';
import { AgenciasAseguradorasResolver } from './agencias-aseguradoras.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgenciasAseguradoras } from 'src/modelsNomgen/entities/AgenciasAseguradoras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    AgenciasAseguradoras
  ])],
  providers: [AgenciasAseguradorasResolver, AgenciasAseguradorasService],
  exports: [AgenciasAseguradorasService]
})
export class AgenciasAseguradorasModule {}
