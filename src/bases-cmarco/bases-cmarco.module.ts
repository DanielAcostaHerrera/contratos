import { forwardRef, Module } from '@nestjs/common';
import { BasesCmarcoService } from './bases-cmarco.service';
import { BasesCmarcoResolver } from './bases-cmarco.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { PuertosModule } from 'src/puertos/puertos.module';
import { ProformasModule } from 'src/proformas/proformas.module';
import { CompradoresModule } from 'src/compradores/compradores.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    BasesCMarco,  
  ]),PuertosModule,ProformasModule, CompradoresModule ],
  providers: [BasesCmarcoResolver, BasesCmarcoService],
  exports: [BasesCmarcoService]
})
export class BasesCmarcoModule {}
