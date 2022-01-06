import { Module } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { PaisesResolver } from './paises.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Paises
  ])],
  providers: [PaisesResolver, PaisesService],
  exports: [PaisesService]
})
export class PaisesModule {}
