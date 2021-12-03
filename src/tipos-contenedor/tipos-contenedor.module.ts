import { Module } from '@nestjs/common';
import { TiposContenedorService } from './tipos-contenedor.service';
import { TiposContenedorResolver } from './tipos-contenedor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposContenedor } from 'src/models/entities/TiposContenedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    TiposContenedor
  ])],
  providers: [TiposContenedorResolver, TiposContenedorService]
})
export class TiposContenedorModule {}
