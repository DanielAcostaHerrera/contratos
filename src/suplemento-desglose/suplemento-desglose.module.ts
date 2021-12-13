import { Module } from '@nestjs/common';
import { SuplementoDesgloseService } from './suplemento-desglose.service';
import { SuplementoDesgloseResolver } from './suplemento-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoDesglose } from 'src/models/entities/SuplementoDesglose.entity';
import { EmbarquesModule } from 'src/embarques/embarques.module';
import { SuplementoResumenModule } from 'src/suplemento-resumen/suplemento-resumen.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoDesglose
  ]),SuplementoResumenModule,EmbarquesModule],
  providers: [SuplementoDesgloseResolver, SuplementoDesgloseService],
  exports: [SuplementoDesgloseService]
})
export class SuplementoDesgloseModule {}
