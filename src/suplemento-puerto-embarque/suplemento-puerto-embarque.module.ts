import { Module } from '@nestjs/common';
import { SuplementoPuertoEmbarqueService } from './suplemento-puerto-embarque.service';
import { SuplementoPuertoEmbarqueResolver } from './suplemento-puerto-embarque.resolver';
import { SuplementoPuertoEmbarque } from 'src/models/entities/SuplementoPuertoEmbarque.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    SuplementoPuertoEmbarque
  ])],
  providers: [SuplementoPuertoEmbarqueResolver, SuplementoPuertoEmbarqueService],
  exports: [SuplementoPuertoEmbarqueService]
})
export class SuplementoPuertoEmbarqueModule {}
