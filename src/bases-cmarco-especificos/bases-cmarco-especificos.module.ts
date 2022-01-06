import { EspecificosModule } from './../especificos/especificos.module';
import { Module } from '@nestjs/common';
import { BasesCmarcoEspecificosService } from './bases-cmarco-especificos.service';
import { BasesCmarcoEspecificosResolver } from './bases-cmarco-especificos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesCMarcoEspecificos } from 'src/models/entities/BasesCMarcoEspecificos.entity';
import { BasesCmarcoModule } from 'src/bases-cmarco/bases-cmarco.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesCMarcoEspecificos
  ]),BasesCmarcoModule,EspecificosModule],
  providers: [BasesCmarcoEspecificosResolver, BasesCmarcoEspecificosService],
  exports: [BasesCmarcoEspecificosService]
})
export class BasesCmarcoEspecificosModule {}
