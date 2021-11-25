import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargos } from 'src/models/entities/Cargos.entity';
import { CargoResolver } from './cargo.resolver';
import { CargoService } from './cargo.service';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Cargos]
  )],
  providers: [CargoResolver, CargoService]
})
export class CargoModule {}
