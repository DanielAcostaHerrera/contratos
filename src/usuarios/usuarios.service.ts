import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hash } from 'crypto';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { In, Repository } from 'typeorm';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import * as bcrypt from 'bcryptjs';
import { MyLogger } from 'src/MyLogger';
import { CreateUsuarioRolInput } from 'src/usuario-rol/dto/create-usuario-rol.input';
import { UsuarioRolService } from 'src/usuario-rol/usuario-rol.service';
import { LogsService } from 'src/logs/logs.service';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/auth.guard';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuarios) public readonly usuariosRepository: Repository<Usuarios>,private ejecutivoService: EjecutivoService,
  private usuarioRolService: UsuarioRolService,private logsService: LogsService) {}

  async save(usuarioToken: Usuarios, createUsuarioInput: CreateUsuarioInput) : Promise<Usuarios> {
    var esNuevo = false;
    var id = createUsuarioInput.idUsuario;
    if(!id){
      esNuevo = true;
      createUsuarioInput.contrasena = createUsuarioInput.nombreUsuario + '*'+ new Date().getFullYear();
    }else {
      esNuevo = false;
      this.usuarioRolService.removeByUserId(id);
    }


    if(createUsuarioInput.contrasena){
      const encryptedPassw = await bcrypt.genSalt(12).then(salt => {
        return bcrypt.hash(createUsuarioInput.contrasena, salt);     
    });  
    createUsuarioInput.contrasena = encryptedPassw.replace('$2a$12$', '');
  }
    const newUsuario = await this.usuariosRepository.save(createUsuarioInput);
    
    if(newUsuario && esNuevo){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Insertado el usuario "+newUsuario.nombreUsuario+"");
    }
    
    createUsuarioInput.roles.forEach(rol => {
      var usuarioRolInput = new CreateUsuarioRolInput();
      usuarioRolInput.idUsuario = newUsuario.idUsuario;
      usuarioRolInput.idRol = rol;
      this.usuarioRolService.save(usuarioRolInput);
    });
    
    return await this.usuariosRepository.findOne({where: {idUsuario: createUsuarioInput.idUsuario},});
  }

  async forcePassword(usuarioToken: Usuarios,idUsuario: number) : Promise<Usuarios> {
    const usuario = await this.findOne(idUsuario); 
    usuario.roles = [];
    usuario.usuarioRoles.forEach(rol =>{
      usuario.roles.push(rol.idRol)
    })
    usuario.contrasena = usuario.nombreUsuario + '*'+ new Date().getFullYear();
    await this.logsService.save(usuarioToken.ejecutivo.nombre, "Forzada la contraseña del usuario "+usuario.nombreUsuario+"");
    return await this.save(usuarioToken,usuario);    
  }

  async modificarContrasena(usuarioToken: Usuarios, idUsuario: number, contrasenaVieja: string, contrasenaNueva: string, contrasenaNuevaConfirmar: string) : Promise<Usuarios>{

    return new Promise<Usuarios>(async (resolve, reject) => {
      const usuario = await this.findOne(idUsuario);
      const validPassw = bcrypt.compareSync(contrasenaVieja, '$2a$12$' + usuario.contrasena);
      if(!validPassw){
        reject('La contraseña actual es incorrecta');
      }
      else if(contrasenaNueva != contrasenaNuevaConfirmar){
        reject('La contraseña nueva y la contraseña de confirmación no coinciden');
      }
      else{ 
        usuario.roles = [];   
        usuario.usuarioRoles.forEach(rol =>{
          usuario.roles.push(rol.idRol)
        })  
        usuario.contrasena = contrasenaNueva;  
        await this.logsService.save(usuarioToken.ejecutivo.nombre, "Modificada la contraseña del usuario "+usuario.nombreUsuario+"");
        resolve(this.save(usuarioToken,usuario)); 
      }
    });
  }
  
  async autenticar(nombreUsuario: string, contrasena: string) : Promise<Usuarios>{

    return new Promise<Usuarios>(async (resolve, reject) => {
      const usuario = await this.usuariosRepository.findOne({ where: {nombreUsuario: nombreUsuario},relations: ['usuarioRoles', 'ejecutivo']});
      if(!usuario){
        reject('Usuario o contraseña incorrectos');
      }
      else{
        const validPassw = bcrypt.compareSync(contrasena, '$2a$12$' + usuario.contrasena);
        if(!validPassw){
          reject('Usuario o contraseña incorrectos');  
        }
        else{
          await this.logsService.save(usuario.ejecutivo.nombre, "El usuario "+usuario.nombreUsuario+" se ha autenticado en el sistema");
          usuario.token = this.createToken(usuario)
          usuario.roles = [];
          usuario.usuarioRoles.forEach(rol =>{
            usuario.roles.push(rol.idRol)
          })
          resolve(usuario);  
        }
      }
    });
  }

  async findAll(): Promise<Usuarios[]> {
    return await this.usuariosRepository.find({ relations: ['usuarioRoles']});
  }

  async findOne(id: number) : Promise<Usuarios> {
    return await this.usuariosRepository.findOne({ where: {idUsuario: id},relations: ['usuarioRoles']});
  }

  async remove(usuarioToken: Usuarios,id: number) : Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const usuario = await this.findOne(id);
      if(usuario.idUsuario == usuarioToken.idUsuario){
        reject('No se puede eliminar el usuario que se encuentra autenticado actualmente');
      }
      else{
        var result = await this.usuariosRepository.remove(usuario);
        if(result){
          await this.logsService.save(usuarioToken.ejecutivo.nombre, "Eliminado el usuario "+result.nombreUsuario+"");
        }
        
        resolve(result);  
      }
    });
  }

  async removeSeveral(usuarioToken: Usuarios,id: number[]) : Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const usuarios = await this.usuariosRepository.findBy({
        idUsuario: In(id)
    });
      var estaLoggeado = false;
      usuarios.forEach(usuario =>{
        if(usuario.idUsuario == usuarioToken.idUsuario){
          estaLoggeado = true;
        }
      })
      if(estaLoggeado){
        reject('No se puede eliminar el usuario que se encuentra autenticado actualmente');
      }
      else{
        var result = await this.usuariosRepository.remove(usuarios);
        if(result){
          var texto = "Eliminados los usuarios ";
          for (let index = 0; index < result.length; index++) {
            if(index != result.length -1)
              texto += result[index].nombreUsuario+", ";
            else
              texto += result[index].nombreUsuario;
          }
          await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);
        }  
        resolve(result);  
      }
    });
  }

  async getEjecutivo (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  private createToken (usuario: Usuarios){
    return jwt.sign({usuario},SECRET_KEY, {expiresIn: 900});
  }

  refreshToken (usuario: Usuarios){
    usuario.token = jwt.sign({usuario},SECRET_KEY, {expiresIn: 900});
    return usuario;
  }
}

