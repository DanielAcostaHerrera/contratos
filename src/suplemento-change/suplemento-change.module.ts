import { Module } from '@nestjs/common';
import { SuplementoChangeService } from './suplemento-change.service';
import { SuplementoChangeResolver } from './suplemento-change.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplementoChange } from 'src/models/entities/SuplementoChange.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SuplementoChange
  ])],
  providers: [SuplementoChangeResolver, SuplementoChangeService],
  exports: [SuplementoChangeService]
})
export class SuplementoChangeModule {}
