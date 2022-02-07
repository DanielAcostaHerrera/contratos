import { Proveedores } from './../modelsMercurio/entities/Proveedores.entity';
import { ProveedoresService } from './../proveedores/proveedores.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBasesCmarcoInput } from './dto/create-bases-cmarco.input';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PuertosService } from 'src/puertos/puertos.service';
import { ProformasService } from 'src/proformas/proformas.service';
import { CompradoresService } from 'src/compradores/compradores.service';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { BasesGeneralesService } from 'src/bases-generales/bases-generales.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { MyLogger } from 'src/MyLogger';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class BasesCmarcoService {
  constructor(@InjectRepository(BasesCMarco) public readonly basesCMarcoRepository: Repository<BasesCMarco>, private puertosService:  PuertosService,
  private proformasService:  ProformasService, private compradoresService:  CompradoresService,private basesGeneralesService:  BasesGeneralesService,
  private proveedoresService:  ProveedoresService, private logsService: LogsService) {}

  async save(createBaseCMarcoInput: CreateBasesCmarcoInput) : Promise<BasesCMarco> {
    if(createBaseCMarcoInput.idBaseCMarco){
      var baseVieja = await this.findOne(createBaseCMarcoInput.idBaseCMarco)
    }

    var result = await this.basesCMarcoRepository.save(createBaseCMarcoInput);
    if(result && !result.idBaseCMarco)
      await this.logsService.save(MyLogger.usuarioLoggeado.ejecutivo.nombre, "Insertada una nueva base de contrato marco con número consecutivo "+result.consecutivo+"")
    if(result && result.idBaseCMarco){
      var texto = "Modificada la base de contrato marco con número consecutivo "+result.consecutivo+"";
      if(baseVieja.idBasesGenerales != result.idBasesGenerales){
        texto += ", cambiada la base general a la cual pertenece";
      }
      if(baseVieja.idProveedor != result.idProveedor){
        texto += ", cambiado el proveedor";
      }
      if(baseVieja.directivaTrd != result.directivaTrd){
        texto += ", cambiada la directiva TRD";
      }
      if(baseVieja.directivaGae != result.directivaGae){
        texto += ", cambiada la directiva GAE";
      }
      if(baseVieja.fecha != result.fecha){
        texto += ", cambiada la fecha";
      }
      if(baseVieja.idProforma != result.idProforma){
        texto += ", cambiada la proforma empleada";
      }
      if(baseVieja.periodoInic != result.periodoInic){
        texto += ", cambiado el periodo inicio";
      }
      if(baseVieja.periodoFin != result.periodoFin){
        texto += ", cambiado el periodo fin";
      }
      if(baseVieja.importeTotal != result.importeTotal){
        texto += ", cambiado el importe total";
      }
      if(baseVieja.importeFinanciamiento != result.importeFinanciamiento){
        texto += ", cambiado el importe de financiamiento";
      }
      if(baseVieja.idPuerto != result.idPuerto){
        texto += ", cambiado el puerto";
      }
      if(baseVieja.aprobado != result.aprobado){
        texto += ", cambiado el estado de aprobado";
      }
      if(baseVieja.cancelado != result.cancelado){
        texto += ", cambiado el estado de cancelado";
      }
      if(baseVieja.activo != result.activo){
        texto += ", cambiado el estado de activo";
      }
      if(baseVieja.actualizado != result.actualizado){
        texto += ", cambiada la fecha de actualización";
      }
      if(baseVieja.periodoInicV != result.periodoInicV){
        texto += ", cambiado el periodo inicio V";
      }
      if(baseVieja.periodoFinV != result.periodoFinV){
        texto += ", cambiado el periodo fin V";
      }
      if(baseVieja.idComprador != result.idComprador){
        texto += ", cambiado el comprador";
      }
      if(baseVieja.noCMarco != result.noCMarco){
        texto += ", cambiado el noCMarco";
      }
      await this.logsService.save(MyLogger.usuarioLoggeado.ejecutivo.nombre, texto)
    }
    return result;
  }

  async findAll(): Promise<BasesCMarco[]> {    
    return await this.basesCMarcoRepository.find({ relations: ['basesCMarcoClausulas','basesCMarcoEspecificos','fichaCostoResumen','contratos']});
  }

  async findOne(id: number) : Promise<BasesCMarco> {
    return await this.basesCMarcoRepository.findOne(id, { relations: ['basesCMarcoClausulas','basesCMarcoEspecificos','fichaCostoResumen','contratos']});
  }


  async remove(id: number) : Promise<BasesCMarco> {
    const basesCMarco = await this.findOne(id);
    var result = await this.basesCMarcoRepository.remove(basesCMarco);
    await this.logsService.save(MyLogger.usuarioLoggeado.ejecutivo.nombre, "Eliminada la base de contrato marco con número consecutivo "+result.consecutivo+"")
    return result;
  }

  async removeSeveral(id: number[]) : Promise<BasesCMarco[]> {
    const basesCMarco = await this.basesCMarcoRepository.findByIds(id);
    var result = await this.basesCMarcoRepository.remove(basesCMarco);
    var texto = "Eliminadas las bases de contrato marco con números consecutivos ";
    for (let index = 0; index < result.length; index++) {
      if(index != result.length -1)
        texto += result[index].consecutivo+", "
      else
        texto += result[index].consecutivo
    }
    await this.logsService.save(MyLogger.usuarioLoggeado.ejecutivo.nombre, texto)
    return result;
  }

  async getPuerto (puertoId: number) : Promise<Puertos>{
    return this.puertosService.findOne(puertoId);
  }

  async getProforma (proformaId: number) : Promise<Proformas>{
    return this.proformasService.findOne(proformaId);
  }

  async getComprador (compradorId: number) : Promise<Compradores>{
    return this.compradoresService.findOne(compradorId);
  }

  async getBasesGenerales (basesGeneralesId: number) : Promise<BasesGenerales>{
    return this.basesGeneralesService.findOne(basesGeneralesId);
  }

  async getProveedor (proveedorId: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(proveedorId);
  }
}
