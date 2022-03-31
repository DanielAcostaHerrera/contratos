import { TiposDeComprasService } from './../tipos-de-compras/tipos-de-compras.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Repository } from 'typeorm';
import { CreateNegociacionResumenInput } from './dto/create-negociacion-resumen.input';
import { MonedaService } from 'src/moneda/moneda.service';
import { GruposDeComprasService } from 'src/grupos-de-compras/grupos-de-compras.service';
import { TiposDeCompras } from 'src/models/entities/TiposDeCompras.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { LogsService } from 'src/logs/logs.service';
import { MyLogger } from 'src/MyLogger';
import { Usuarios } from 'src/models/entities/Usuarios.entity';

@Injectable()
export class NegociacionResumenService {
  constructor(@InjectRepository(NegociacionResumen) public readonly negociacionResumenRepository: Repository<NegociacionResumen>,
  private tiposDeComprasService: TiposDeComprasService,private monedaService: MonedaService,private gruposDeComprasService: GruposDeComprasService,
  private proveedoresService: ProveedoresService,private logsService: LogsService) {}


  async save(usuarioToken: Usuarios,createNegociacionResumenInput: CreateNegociacionResumenInput) : Promise<NegociacionResumen> {
    if(createNegociacionResumenInput.idNegociacion){
      var negociacionVieja = await this.findOne(createNegociacionResumenInput.idNegociacion);
    }

    var result = await this.negociacionResumenRepository.save(createNegociacionResumenInput);
    if(result && !result.idNegociacion){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Insertada una nueva negociación con número "+result.noNegociacion+"");
    }
    if(result && result.idNegociacion){
      var texto = "Modificada la negociación con número "+result.noNegociacion+"";
        if(negociacionVieja.fecha != result.fecha){
          texto += ", cambiada la fecha";
        }
        if(negociacionVieja.comite != result.comite){
          texto += ", cambiado el comite de contratacion";
        }
        if(negociacionVieja.idMoneda != result.idMoneda){
          texto += ", cambiada la moneda";
        }
        if(negociacionVieja.idTipoCompras != result.idTipoCompras){
          texto += ", cambiado el tipo de compra";
        }
        if(negociacionVieja.idGrupo != result.idGrupo){
          texto += ", cambiado el grupo";
        }
        if(negociacionVieja.mercancias != result.mercancias){
          texto += ", cambiadas las mercancias";
        }
        if(negociacionVieja.aprobada != result.aprobada){
          texto += ", cambiado el estado de aprobado";
        }
        if(negociacionVieja.cancelada != result.cancelada){
          texto += ", cambiado el estado de cancelado";
        }
        if(negociacionVieja.nota != result.nota){
          texto += ", cambiada la nota";
        }
        if(negociacionVieja.idProveedor != result.idProveedor){
          texto += ", cambiado el proveedor";
        }
        if(negociacionVieja.importeTrd != result.importeTrd){
          texto += ", cambiado el importe TRD";
        }
        if(negociacionVieja.importeGae != result.importeGae){
          texto += ", cambiado el importe GAE";
        }
        if(negociacionVieja.importeCuc != result.importeCuc){
          texto += ", cambiado el importe CUC";
        }
        if(negociacionVieja.comentarios != result.comentarios){
          texto += ", cambiados los comentarios";
        }
        if(negociacionVieja.operacion != result.operacion){
          texto += ", cambiada la operación";
        }
        if(negociacionVieja.tasa != result.tasa){
          texto += ", cambiada la tasa";
        }
        if(negociacionVieja.terminado != result.terminado){
          texto += ", cambiado el estado de terminado";
        }
        await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);
    }
    return result;
  }

  async findAll(): Promise<NegociacionResumen[]> {
    return await this.negociacionResumenRepository.find({ relations: ['negociacionDetalle','negociacionDetalles','negociacionProveedores','fichaCompraResumen',
    'solicitudContratacion','contratos','facturaResumen']});
  }

  async findOne(id: number) : Promise<NegociacionResumen> {
    return await this.negociacionResumenRepository.findOne(id,{ relations: ['negociacionDetalle','negociacionDetalles','negociacionProveedores',
    'fichaCompraResumen','solicitudContratacion','contratos','facturaResumen']});
  }

  async remove(usuarioToken: Usuarios,id: number) : Promise<any> {
    const negociacionResumen = await this.findOne(id);
    var result = await this.negociacionResumenRepository.remove(negociacionResumen);
    if(result){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Eliminada la negociación con número "+result.noNegociacion+"");
    }
    
    return result;
  }

  async removeSeveral(usuarioToken: Usuarios,id: number[]) : Promise<any> {
    const negociacionResumen = await this.negociacionResumenRepository.findByIds(id);
    var result = await this.negociacionResumenRepository.remove(negociacionResumen);
    if(result){
      var texto = "Eliminados las negociaciones con números ";
      for (let index = 0; index < result.length; index++) {
        if(index != result.length -1)
          texto += result[index].noNegociacion+", ";
        else
          texto += result[index].noNegociacion;
      }
      await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);
    }
    
    return result;
  }

  async getTipoCompra (tipoCompraId: number) : Promise<TiposDeCompras>{
    return this.tiposDeComprasService.findOne(tipoCompraId);
  }

  async getMoneda (monedaId: number) : Promise<Monedas>{
    return this.monedaService.findOne(monedaId);
  }

  async getGrupo (grupoId: number) : Promise<GruposDeCompras>{
    return this.gruposDeComprasService.findOne(grupoId);
  }

  async getProveedor (Id: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(Id);
  }
}
