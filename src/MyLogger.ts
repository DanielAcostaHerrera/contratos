import { Usuarios } from 'src/models/entities/Usuarios.entity';

export class MyLogger { 

  public static usuarioLoggeado: Usuarios

  public static getDate () : string{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
  
    var date = dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes + ':' + seconds ;
  
    return date;
  }
}
