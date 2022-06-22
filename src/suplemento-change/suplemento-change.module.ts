import { Module } from '@nestjs/common';
import { SuplementoChangeService } from './suplemento-change.service';
import { SuplementoChangeResolver } from './suplemento-change.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoChange } from 'src/models/entities/SuplementoChange.entity';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { CambiosSuplementosModule } from 'src/cambios-suplementos/cambios-suplementos.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoChange
  ]),SuplementoResumenModule,CambiosSuplementosModule],
  providers: [SuplementoChangeResolver, SuplementoChangeService],
  exports: [SuplementoChangeService]
})
export class SuplementoChangeModule {}
