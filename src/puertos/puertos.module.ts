import { Module } from '@nestjs/common';
import { PuertosService } from './puertos.service';
import { PuertosResolver } from './puertos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puertos } from 'src/models/entities/Puertos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Puertos
  ])],
  providers: [PuertosResolver, PuertosService]
})
export class PuertosModule {}
