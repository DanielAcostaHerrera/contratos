import { Module } from '@nestjs/common';
import { ContenedoresService } from './contenedores.service';
import { ContenedoresResolver } from './contenedores.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contenedores } from 'src/models/entities/Contenedores.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Contenedores]
  )],
  providers: [ContenedoresResolver, ContenedoresService],
  exports: [ContenedoresService]
})
export class ContenedoresModule {}
