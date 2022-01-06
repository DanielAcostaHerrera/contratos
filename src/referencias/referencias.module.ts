import { Module } from '@nestjs/common';
import { ReferenciasService } from './referencias.service';
import { ReferenciasResolver } from './referencias.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Referencias]
  )],
  providers: [ReferenciasResolver, ReferenciasService],
  exports: [ReferenciasService]
})
export class ReferenciasModule {}
