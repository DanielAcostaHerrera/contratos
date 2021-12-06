import { Module } from '@nestjs/common';
import { CompradoresService } from './compradores.service';
import { CompradoresResolver } from './compradores.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compradores } from 'src/models/entities/Compradores.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Compradores]
  )],
  providers: [CompradoresResolver, CompradoresService],
  exports: [CompradoresService]
})
export class CompradoresModule {}
