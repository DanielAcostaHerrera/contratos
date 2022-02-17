import { Module } from '@nestjs/common';
import { PuertoEmbarqueService } from './puerto-embarque.service';
import { PuertoEmbarqueResolver } from './puerto-embarque.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuertoEmbarque } from 'src/models/entities/PuertoEmbarque.entity';
import { PuertosModule } from 'src/puertos/puertos.module';
import { EmbarquesModule } from 'src/embarques/embarques.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    PuertoEmbarque
  ]),PuertosModule,EmbarquesModule],
  providers: [PuertoEmbarqueResolver, PuertoEmbarqueService],
  exports: [PuertoEmbarqueService]
})
export class PuertoEmbarqueModule {}
