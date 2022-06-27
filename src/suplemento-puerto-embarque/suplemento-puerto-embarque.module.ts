import { Module } from '@nestjs/common';
import { SuplementoPuertoEmbarqueService } from './suplemento-puerto-embarque.service';
import { SuplementoPuertoEmbarqueResolver } from './suplemento-puerto-embarque.resolver';
import { SuplementoPuertoEmbarque } from 'src/models/entities/SuplementoPuertoEmbarque.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { PuertosModule } from 'src/puertos/puertos.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    SuplementoPuertoEmbarque
  ]),SuplementoResumenModule,EmbarquesModule,PuertosModule],
  providers: [SuplementoPuertoEmbarqueResolver, SuplementoPuertoEmbarqueService],
  exports: [SuplementoPuertoEmbarqueService]
})
export class SuplementoPuertoEmbarqueModule {}
