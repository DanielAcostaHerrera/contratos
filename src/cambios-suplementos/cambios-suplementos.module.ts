import { Module } from '@nestjs/common';
import { CambiosSuplementosService } from './cambios-suplementos.service';
import { CambiosSuplementosResolver } from './cambios-suplementos.resolver';
import { CambiosSuplementos } from 'src/models/entities/CambiosSuplementos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([
    CambiosSuplementos
  ])],
  providers: [CambiosSuplementosResolver, CambiosSuplementosService],
  exports: [CambiosSuplementosService]
})
export class CambiosSuplementosModule {}
