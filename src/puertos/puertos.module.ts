import { Module } from '@nestjs/common';
import { PuertosService } from './puertos.service';
import { PuertosResolver } from './puertos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { PaisesModule } from 'src/paises/paises.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Puertos
  ]),PaisesModule,LogsModule],
  providers: [PuertosResolver, PuertosService],
  exports: [PuertosService]
})
export class PuertosModule {}
