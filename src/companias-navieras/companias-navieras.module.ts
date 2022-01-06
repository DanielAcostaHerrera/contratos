import { Module } from '@nestjs/common';
import { CompaniasNavierasService } from './companias-navieras.service';
import { CompaniasNavierasResolver } from './companias-navieras.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    CompaniasNavieras
  ])],
  providers: [CompaniasNavierasResolver, CompaniasNavierasService],
  exports: [CompaniasNavierasService]
})
export class CompaniasNavierasModule {}
