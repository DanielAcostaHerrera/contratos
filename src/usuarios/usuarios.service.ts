import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hash } from 'crypto';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import * as bcrypt from 'bcryptjs';
import { MyLogger } from 'src/MyLogger';
import { CreateUsuarioRolInput } from 'src/usuario-rol/dto/create-usuario-rol.input';
import { UsuarioRolService } from 'src/usuario-rol/usuario-rol.service';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuarios) public readonly usuariosRepository: Repository<Usuarios>,private ejecutivoService: EjecutivoService,
  private usuarioRolService: UsuarioRolService) {}

  async save(createUsuarioInput: CreateUsuarioInput) : Promise<Usuarios> {
    var id = createUsuarioInput.idUsuario;

    if(createUsuarioInput.contrasena){
      const encryptedPassw = await bcrypt.genSalt(12).then(salt => {
        return bcrypt.hash(createUsuarioInput.contrasena, salt);     
    });  
    createUsuarioInput.contrasena = encryptedPassw.replace('$2a$12$', '');
  }

    if(id != null){        
      this.usuarioRolService.removeByUserId(id);
    }

    const newUsuario = await this.usuariosRepository.save(createUsuarioInput);     
    createUsuarioInput.roles.forEach(rol => {
      var usuarioRolInput = new CreateUsuarioRolInput();
      usuarioRolInput.idUsuario = newUsuario.idUsuario;
      usuarioRolInput.idRol = rol;
      this.usuarioRolService.save(usuarioRolInput)
    });
    
    return await this.usuariosRepository.findOne(createUsuarioInput.idUsuario);
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
          MyLogger.usuarioLoggeado = usuario;
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

