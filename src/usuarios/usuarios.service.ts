import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioInput } from './dto/create-usuario.input';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuarios) public readonly usuariosRepository: Repository<Usuarios>,private ejecutivoService: EjecutivoService) {}

  async save(createUsuarioInput: CreateUsuarioInput) : Promise<Usuarios> {
    return await this.usuariosRepository.save(createUsuarioInput);
  }

  async findAll(): Promise<Usuarios[]> {
    return await this.usuariosRepository.find({ relations: ['usuarioRoles']});
  }

  async findOne(id: number) : Promise<Usuarios> {
    return await this.usuariosRepository.findOne(id,{ relations: ['usuarioRoles']});
  }

  async remove(id: number) : Promise<any> {
    return await this.usuariosRepository.delete(id);
  }

  async getEjecutivo (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }
}

