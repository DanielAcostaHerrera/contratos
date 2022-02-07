import { UsuarioRolModule } from './../usuario-rol/usuario-rol.module';
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { EjecutivoModule } from 'src/ejecutivo/ejecutivo.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Usuarios
  ]),UsuarioRolModule,EjecutivoModule,LogsModule],
  providers: [UsuariosResolver, UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}
