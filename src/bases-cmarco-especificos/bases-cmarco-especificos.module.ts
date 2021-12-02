import { Module } from '@nestjs/common';
import { BasesCmarcoEspecificosService } from './bases-cmarco-especificos.service';
import { BasesCmarcoEspecificosResolver } from './bases-cmarco-especificos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesCMarcoEspecificos } from 'src/models/entities/BasesCMarcoEspecificos.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesCMarcoEspecificos
  ])],
  providers: [BasesCmarcoEspecificosResolver, BasesCmarcoEspecificosService]
})
export class BasesCmarcoEspecificosModule {}
