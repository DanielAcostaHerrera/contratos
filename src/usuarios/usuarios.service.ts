import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hash } from 'crypto';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuarios) public readonly usuariosRepository: Repository<Usuarios>,private ejecutivoService: EjecutivoService) {}

  async save(createUsuarioInput: CreateUsuarioInput) : Promise<Usuarios> {
    const encryptedPassw = await bcrypt.genSalt(12).then(salt => {
      return bcrypt.hash(createUsuarioInput.contrasena, salt);
    });

    createUsuarioInput.contrasena = encryptedPassw.replace('$2a$12$', '');

    return await this.usuariosRepository.save(createUsuarioInput);
  }

  async autenticar(nombreUsuario: string, contrasena: string) : Promise<Usuarios>{

    return new Promise<Usuarios>(async (resolve, reject) => {
      const usuario = await this.usuariosRepository.findOne({nombreUsuario},{ relations: ['usuarioRoles']});
      if(!usuario){
        reject('Usuario o contraseña incorrectos');
      }
      else{
        const validPassw = bcrypt.compareSync(contrasena, '$2a$12$' + usuario.contrasena);
        if(!validPassw){
          reject('Usuario o contraseña incorrectos');  
        }
        else{
          resolve(usuario);  
        }
      }
    });
  }

  async findAll(): Promise<Usuarios[]> {
    return await this.usuariosRepository.find({ relations: ['usuarioRoles']});
  }

  async findOne(id: number) : Promise<Usuarios> {
    return await this.usuariosRepository.findOne(id,{ relations: ['usuarioRoles']});
  }

  async remove(id: number) : Promise<any> {
    const usuarios = await this.findOne(id);
    return await this.usuariosRepository.remove(usuarios);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const usuarios = await this.usuariosRepository.findByIds(id);
    return await this.usuariosRepository.remove(usuarios);
  }

  async getEjecutivo (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }
}

