import { Module } from '@nestjs/common';
import { ProformasService } from './proformas.service';
import { ProformasResolver } from './proformas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proformas } from 'src/models/entities/Proformas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Proformas
  ])],
  providers: [ProformasResolver, ProformasService],
  exports: [ProformasService]
})
export class ProformasModule {}
