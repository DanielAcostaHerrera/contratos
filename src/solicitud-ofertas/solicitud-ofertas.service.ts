import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { SolicitudContratacion } from 'src/models/entities/SolicitudContratacion.entity';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { MyLogger } from 'src/MyLogger';
import { SolicitudContratacionService } from 'src/solicitud-contratacion/solicitud-contratacion.service';
import { Repository } from 'typeorm';
import { CreateSolicitudOfertaInput } from './dto/create-solicitud-oferta.input';

@Injectable()
export class SolicitudOfertasService {
  constructor(@InjectRepository(SolicitudOfertas) public readonly solicitudOfertaRepository: Repository<SolicitudOfertas>,
  private solicitudContratacionService: SolicitudContratacionService,private logsService: LogsService) {}


  async save(createSolicitudOfertaInput: CreateSolicitudOfertaInput) : Promise<SolicitudOfertas> {
    if(createSolicitudOfertaInput.idOferta){
      var ofertaVieja = await this.findOne(createSolicitudOfertaInput.idOferta)
    }

    var result = await this.solicitudOfertaRepository.save(createSolicitudOfertaInput);
    if(result && !result.idOferta){
      await this.logsService.save(MyLogger.usuarioLoggeado.ejecutivo.nombre, "Insertada una nueva solicitud de oferta con número consecutivo "+result.consecutivo+"")
    }
    if(result && result.idOferta){
      var texto = "Modificada una solicitud de oferta con número consecutivo "+result.consecutivo+"";
        if(ofertaVieja.solicitud != result.solicitud){
          texto += ", cambiada la solicitud";
        }
        if(ofertaVieja.fechaSolicitudOferta != result.fechaSolicitudOferta){
          texto += ", cambiada la fecha de solicitud de la oferta";
        }
        if(ofertaVieja.fechaEnviadaOferta != result.fechaEnviadaOferta){
          texto += ", cambiada la fecha de envio de la oferta";
        }
        if(ofertaVieja.fechaFin != result.fechaFin){
          texto += ", cambiada la fecha fin";
        }
        if(ofertaVieja.contraOferta != result.contraOferta){
          texto += ", cambiado el estado de contraoferta";
        }
        if(ofertaVieja.terminada != result.terminada){
          texto += ", cambiado el estado de terminada";
        }
        if(ofertaVieja.cancelada != result.cancelada){
          texto += ", cambiado el estado de cancelada";
        }
        if(ofertaVieja.elaboradoPor != result.elaboradoPor){
          texto += ", cambiado el ejectivo que elabora";
        }
        if(ofertaVieja.aprobadoPor != result.aprobadoPor){
          texto += ", cambiada el ejecutivo que aprueba";
        }
        await this.logsService.save(MyLogger.usuarioLoggeado.ejecutivo.nombre, texto)
    }

    return result;
  }

  async findAll(): Promise<SolicitudOfertas[]> { 
    return await this.solicitudOfertaRepository.find({relations:['pliegoConcurrencias','solicitudOfertasProveedores']});
  }

  async findOne(id: number) : Promise<SolicitudOfertas> {
    return await this.solicitudOfertaRepository.findOne(id,{relations:['pliegoConcurrencias','solicitudOfertasProveedores']});
  }

  async remove(id: number) : Promise<any> {
    const solicitudOfertas = await this.findOne(id);
    var result = await this.solicitudOfertaRepository.remove(solicitudOfertas);
    await this.logsService.save(MyLogger.usuarioLoggeado.ejecutivo.nombre, "Eliminada la solicitud de oferta con número consecutivo "+result.consecutivo+"")
    return result;
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const solicitudOfertas = await this.solicitudOfertaRepository.findByIds(id);
    var result = await this.solicitudOfertaRepository.remove(solicitudOfertas);
    var texto = "Eliminadas las solicitudes de ofertas con números consecutivos ";
    for (let index = 0; index < result.length; index++) {
      if(index != result.length -1)
        texto += result[index].consecutivo+", "
      else
        texto += result[index].consecutivo
    }
    await this.logsService.save(MyLogger.usuarioLoggeado.ejecutivo.nombre, texto)
    return result;
  }

  async getSolicitudContratacion (id: number) : Promise<SolicitudContratacion>{
    return this.solicitudContratacionService.findOne(id);
  }
}
