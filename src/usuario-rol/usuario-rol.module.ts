import { Module } from '@nestjs/common';
import { UsuarioRolService } from './usuario-rol.service';
import { UsuarioRolResolver } from './usuario-rol.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRol } from 'src/models/entities/UsuarioRol.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    UsuarioRol
  ]),UsuariosModule,RolesModule],
  providers: [UsuarioRolResolver, UsuarioRolService],
  exports: [UsuarioRolService]
})
export class UsuarioRolModule {}
