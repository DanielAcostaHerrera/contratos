import { Module } from '@nestjs/common';
import { BasesGeneralesService } from './bases-generales.service';
import { BasesGeneralesResolver } from './bases-generales.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesGenerales
  ])],
  providers: [BasesGeneralesResolver, BasesGeneralesService]
})
export class BasesGeneralesModule {}
