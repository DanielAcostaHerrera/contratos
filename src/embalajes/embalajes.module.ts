import { Module } from '@nestjs/common';
import { EmbalajesResolver } from './embalajes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Embalajes } from '../models/entities/Embalajes.entity';
import { EmbalajesService } from './Embalajes.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Embalajes
  ])],
  providers: [EmbalajesResolver, EmbalajesService],
})
export class EmbalajesModule {}
