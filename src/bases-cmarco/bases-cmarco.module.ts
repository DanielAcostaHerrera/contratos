import { Module } from '@nestjs/common';
import { BasesCmarcoService } from './bases-cmarco.service';
import { BasesCmarcoResolver } from './bases-cmarco.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesCMarco
  ])],
  providers: [BasesCmarcoResolver, BasesCmarcoService]
})
export class BasesCmarcoModule {}
