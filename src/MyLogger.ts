import { Usuarios } from 'src/models/entities/Usuarios.entity';
const winston = require('winston');

export class MyLogger {

public static usuarioLoggeado: Usuarios 

public static logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
    ]
});

 public static getDate () : String{
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
