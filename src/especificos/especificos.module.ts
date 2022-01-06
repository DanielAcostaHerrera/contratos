import { Module } from '@nestjs/common';
import { EspecificosService } from './especificos.service';
import { EspecificosResolver } from './especificos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especificos } from 'src/modelsMercurio/entities/Especificos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Especificos
  ])],
  providers: [EspecificosResolver, EspecificosService],
  exports: [EspecificosService]
})
export class EspecificosModule {}
