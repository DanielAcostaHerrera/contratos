import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsResolver } from './logs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from 'src/models/entities/Logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Logs]
  )],
  providers: [LogsResolver, LogsService],
  exports: [LogsService]
})
export class LogsModule {}
