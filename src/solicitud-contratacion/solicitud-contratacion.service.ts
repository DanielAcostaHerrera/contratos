import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompradoresService } from 'src/compradores/compradores.service';
import { LogsService } from 'src/logs/logs.service';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { SolicitudContratacion } from 'src/models/entities/SolicitudContratacion.entity';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { MyLogger } from 'src/MyLogger';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { Repository } from 'typeorm';
import { CreateSolicitudContratacionInput } from './dto/create-solicitud-contratacion.input';

@Injectable()
export class SolicitudContratacionService {
  constructor(@InjectRepository(SolicitudContratacion) public readonly solicitudContratacionRepository: Repository<SolicitudContratacion>,
  private negociacionResumenService: NegociacionResumenService,private compradoresService: CompradoresService,private logsService: LogsService) {}


  async save(usuarioToken: Usuarios,createSolicitudContratacionInput: CreateSolicitudContratacionInput) : Promise<SolicitudContratacion> {
    var esNuevo = true;
    if(createSolicitudContratacionInput.idSolicitudContrato){
      esNuevo = false;
      var solicitudContratacionVieja = await this.findOne(createSolicitudContratacionInput.idSolicitudContrato);
    }

    if(!createSolicitudContratacionInput.idSolicitudContrato){
      esNuevo = true;
      var negociacion = await this.negociacionResumenService.findOne(createSolicitudContratacionInput.idNegociacion);
      var cantSolicitudContratacion = negociacion.solicitudContratacion.length;
      createSolicitudContratacionInput.consecutivo = cantSolicitudContratacion+1;
    }

    var result = await this.solicitudContratacionRepository.save(createSolicitudContratacionInput);
    if(result && esNuevo){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Insertada una nueva solicitud de contratación con número consecutivo "+result.consecutivo+"");
    }
    if(result && !esNuevo){
      var texto = "Modificada una solicitud de oferta con número consecutivo "+result.consecutivo+"";
        if(solicitudContratacionVieja.idComprador != result.idComprador){
          texto += ", cambiado el comprador";
        }
        if(solicitudContratacionVieja.fecha != result.fecha){
          texto += ", cambiada la fecha de solicitud de la solicitud";
        }
        if(solicitudContratacionVieja.nota != result.nota){
          texto += ", cambiada la nota";
        }
        await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);
    }

    return result;
  }

  async findAll(): Promise<SolicitudContratacion[]> { 
    return await this.solicitudContratacionRepository.find({relations:['solicitudOfertas']});
  }

  async findOne(id: number) : Promise<SolicitudContratacion> {
    return await this.solicitudContratacionRepository.findOne({where: {idSolicitudContrato: id},relations:['solicitudOfertas']});
  }

  async remove(usuarioToken: Usuarios,id: number) : Promise<any> {
    const solicitudContratacion = await this.findOne(id);
    var result = await this.solicitudContratacionRepository.remove(solicitudContratacion);
    if(result){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Eliminada la solicitud de contratación con número consecutivo "+result.consecutivo+"");
    }
      
    return result;
  }

  async removeSeveral(usuarioToken: Usuarios,id: number[]) : Promise<any> {
    const solicitudContratacion = await this.solicitudContratacionRepository.findByIds(id);
    var result = await this.solicitudContratacionRepository.remove(solicitudContratacion);
    if(result){
      var texto = "Eliminadas las solicitudes de contratación con números consecutivos ";
      for (let index = 0; index < result.length; index++) {
        if(index != result.length -1)
          texto += result[index].consecutivo+", ";
        else
          texto += result[index].consecutivo;
      }
      await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);   
    }
    
    return result;
  }

  async getNegociacionResumen (id: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(id);
  }

  async getCompradores (id: number) : Promise<Compradores>{
    return this.compradoresService.findOne(id);
  }
}
