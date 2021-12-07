import { Module } from '@nestjs/common';
import { CampanasService } from './campanas.service';
import { CampanasResolver } from './campanas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campanas } from 'src/models/entities/Campanas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Campanas
  ])],
  providers: [CampanasResolver, CampanasService],
  exports: [CampanasService]
})
export class CampanasModule {}
