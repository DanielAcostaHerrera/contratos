import { Module } from '@nestjs/common';
import { IncotermService } from './incoterm.service';
import { IncotermResolver } from './incoterm.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incoterm } from 'src/models/entities/Incoterm.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Incoterm]
  )],
  providers: [IncotermResolver, IncotermService]
})
export class IncotermModule {}
