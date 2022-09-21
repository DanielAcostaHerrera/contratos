import { Module } from '@nestjs/common';
import { UsuarioRolService } from './usuario-rol.service';
import { UsuarioRolResolver } from './usuario-rol.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRol } from 'src/models/entities/UsuarioRol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    UsuarioRol
  ])],
  providers: [UsuarioRolResolver, UsuarioRolService],
  exports: [UsuarioRolService]
})
export class UsuarioRolModule {}
