import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/models/entities/Roles.entity';
import { UsuarioRol } from 'src/models/entities/UsuarioRol.entity';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { RolesService } from 'src/roles/roles.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { CreateUsuarioRolInput } from './dto/create-usuario-rol.input';

@Injectable()
export class UsuarioRolService {
  constructor(@InjectRepository(UsuarioRol) public readonly usuarioRolRepository: Repository<UsuarioRol>,
  private usuariosService: UsuariosService, private rolesService: RolesService) {}

  async save(createUsuarioRolInput: CreateUsuarioRolInput) : Promise<UsuarioRol> {
    return await this.usuarioRolRepository.save(createUsuarioRolInput);
  }

  async findAll(): Promise<UsuarioRol[]> {
    return await this.usuarioRolRepository.find();
  }

  async findOne(id: number) : Promise<UsuarioRol> {
    return await this.usuarioRolRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const usuarioRol = await this.findOne(id);
    return await this.usuarioRolRepository.remove(usuarioRol);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const usuarioRol = await this.usuarioRolRepository.findByIds(id);
    return await this.usuarioRolRepository.remove(usuarioRol);
  }

  async getUsuario (Id: number) : Promise<Usuarios>{
    return this.usuariosService.findOne(Id);
  }

  async getRol (Id: number) : Promise<Roles>{
    return this.rolesService.findOne(Id);
  }
}
