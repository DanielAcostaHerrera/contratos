import { Module } from '@nestjs/common';
import { PagosApartirDeService } from './pagos-apartir-de.service';
import { PagosApartirDeResolver } from './pagos-apartir-de.resolver';
import { PagosAPartirDe } from 'src/models/entities/PagosAPartirDe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    PagosAPartirDe
  ])],
  providers: [PagosApartirDeResolver, PagosApartirDeService],
  exports: [PagosApartirDeService]
})
export class PagosApartirDeModule {}
