import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresResolver } from './proveedores.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Proveedores
  ])],
  providers: [ProveedoresResolver, ProveedoresService],
  exports: [ProveedoresService]
})
export class ProveedoresModule {}
