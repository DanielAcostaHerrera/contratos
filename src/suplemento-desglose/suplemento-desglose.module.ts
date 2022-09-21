import { Module } from '@nestjs/common';
import { SuplementoDesgloseService } from './suplemento-desglose.service';
import { SuplementoDesgloseResolver } from './suplemento-desglose.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoDesglose } from 'src/models/entities/SuplementoDesglose.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoDesglose
  ])],
  providers: [SuplementoDesgloseResolver, SuplementoDesgloseService],
  exports: [SuplementoDesgloseService]
})
export class SuplementoDesgloseModule {}
