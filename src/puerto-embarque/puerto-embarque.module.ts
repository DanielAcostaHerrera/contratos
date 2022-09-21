import { Module } from '@nestjs/common';
import { PuertoEmbarqueService } from './puerto-embarque.service';
import { PuertoEmbarqueResolver } from './puerto-embarque.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuertoEmbarque } from 'src/models/entities/PuertoEmbarque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    PuertoEmbarque
  ])],
  providers: [PuertoEmbarqueResolver, PuertoEmbarqueService],
  exports: [PuertoEmbarqueService]
})
export class PuertoEmbarqueModule {}
