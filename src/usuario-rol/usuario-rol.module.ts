import { Module } from '@nestjs/common';
import { UsuarioRolService } from './usuario-rol.service';
import { UsuarioRolResolver } from './usuario-rol.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRol } from 'src/models/entities/UsuarioRol.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    UsuarioRol
  ]),RolesModule],
  providers: [UsuarioRolResolver, UsuarioRolService],
  exports: [UsuarioRolService]
})
export class UsuarioRolModule {}
