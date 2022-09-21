import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRol } from 'src/models/entities/UsuarioRol.entity';
import { In, Repository } from 'typeorm';
import { CreateUsuarioRolInput } from './dto/create-usuario-rol.input';

@Injectable()
export class UsuarioRolService {
  constructor(@InjectRepository(UsuarioRol) public readonly usuarioRolRepository: Repository<UsuarioRol>) {}

  async save(createUsuarioRolInput: CreateUsuarioRolInput) : Promise<UsuarioRol> {
    return await this.usuarioRolRepository.save(createUsuarioRolInput);
  }

  async findAll(): Promise<UsuarioRol[]> {
    return await this.usuarioRolRepository.find({relations:['usuario','rol']});
  }

  async findOne(id: number) : Promise<UsuarioRol> {
    return await this.usuarioRolRepository.findOne({where: {idUsuarioRol: id},relations:['usuario','rol']});
  }

  async remove(id: number) : Promise<any> {
    const usuarioRol = await this.findOne(id);
    return await this.usuarioRolRepository.remove(usuarioRol);
  }

  async removeByUserId(userId: number) : Promise<any> {
    const usuarioRol = await this.usuarioRolRepository.find({where: {
      idUsuario: userId
    }});
    return await this.usuarioRolRepository.remove(usuarioRol);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const usuarioRol = await this.usuarioRolRepository.findBy({
      idUsuarioRol: In(id)
  });
    return await this.usuarioRolRepository.remove(usuarioRol);
  }
}
