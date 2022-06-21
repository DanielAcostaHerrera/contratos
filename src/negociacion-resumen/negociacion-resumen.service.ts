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
import { LogsService } from 'src/logs/logs.service';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { NegociacionProveedoresService } from 'src/negociacion-proveedores/negociacion-proveedores.service';
import { CreateNegociacionProveedoresInput } from 'src/negociacion-proveedores/dto/create-negociacion-proveedores.input';

@Injectable()
export class NegociacionResumenService {
  constructor(@InjectRepository(NegociacionResumen) public readonly negociacionResumenRepository: Repository<NegociacionResumen>,
  private tiposDeComprasService: TiposDeComprasService,private monedaService: MonedaService,private gruposDeComprasService: GruposDeComprasService,
  private logsService: LogsService,private negociacionProveedoresService: NegociacionProveedoresService) {}


  async save(usuarioToken: Usuarios,createNegociacionResumenInput: CreateNegociacionResumenInput) : Promise<NegociacionResumen> {
    var today = new Date();
    var esNuevo = false;
    var result: NegociacionResumen;
    
    if(createNegociacionResumenInput.idNegociacion){
      esNuevo = false;
      var negociacionVieja = await this.findOne(createNegociacionResumenInput.idNegociacion);

      await this.negociacionProveedoresService.removeSeveralByNegociacionId(createNegociacionResumenInput.idNegociacion);

      let importeCUC = 0.0;
      let importeTRD = 0.0;
      let importeGAE = 0.0;
      let proveedores = createNegociacionResumenInput.negociacionProveedores;

      for (let index = 0; index < proveedores.length; index++) {
        importeCUC += proveedores[index].importe;                 
      }
      
      if(importeCUC < 500000.0){
        importeTRD = importeCUC;
      }
      else{
        importeGAE = importeCUC;
      }

      createNegociacionResumenInput.importeCuc = importeCUC;
      createNegociacionResumenInput.importeTrd = importeTRD;
      createNegociacionResumenInput.importeGae = importeGAE;

      result = await this.negociacionResumenRepository.save(createNegociacionResumenInput);

      if(result){
        let proveedores = createNegociacionResumenInput.negociacionProveedores;
        for (let index = 0; index < proveedores.length; index++) {
          const proveedor = proveedores[index];
          
          var proveedorNegociacion = new CreateNegociacionProveedoresInput();
          proveedorNegociacion.idNegociacion = result.idNegociacion;
          proveedorNegociacion.idProveedor = proveedor.idProveedor;
          proveedorNegociacion.importe = proveedor.importe;
          proveedorNegociacion.ladi = proveedor.ladi;
          await this.negociacionProveedoresService.save(proveedorNegociacion);        
        }
      }
    }

    if(!createNegociacionResumenInput.idNegociacion){
      esNuevo = true;
      var negociacionesAnteriores = await this.findAll();
      var ultimanegociacion = negociacionesAnteriores[0];

      if(ultimanegociacion.fecha.getFullYear() === today.getFullYear()){
        createNegociacionResumenInput.consecutivo = ultimanegociacion.consecutivo+1;    
      }
      else{
        createNegociacionResumenInput.consecutivo = 1;
      }

      let importeCUC = 0.0;
      let importeTRD = 0.0;
      let importeGAE = 0.0;
      let proveedores = createNegociacionResumenInput.negociacionProveedores;
      
      for (let index = 0; index < proveedores.length; index++) {
        importeCUC += proveedores[index].importe;                 
      }
      
      if(importeCUC < 500000.0){
        importeTRD = importeCUC;
      }
      else{
        importeGAE = importeCUC;
      }

      createNegociacionResumenInput.importeCuc = importeCUC;
      createNegociacionResumenInput.importeTrd = importeTRD;
      createNegociacionResumenInput.importeGae = importeGAE;

      result = await this.negociacionResumenRepository.save(createNegociacionResumenInput);

      if(result){
        let proveedores = createNegociacionResumenInput.negociacionProveedores;
        for (let index = 0; index < proveedores.length; index++) {
          const proveedor = proveedores[index];
          
          var proveedorNegociacion = new CreateNegociacionProveedoresInput();
          proveedorNegociacion.idNegociacion = result.idNegociacion;
          proveedorNegociacion.idProveedor = proveedor.idProveedor;
          proveedorNegociacion.importe = proveedor.importe;
          proveedorNegociacion.ladi = proveedor.ladi;
          await this.negociacionProveedoresService.save(proveedorNegociacion);        
        }
      }
    }

    if(result && esNuevo){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Insertada una nueva negociación con número "+result.noNegociacion+"");
    }
    if(result && !esNuevo){
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
    return await this.negociacionResumenRepository.find({order: {
      fecha : "DESC",
    }, relations: ['negociacionProveedores','fichaCompraResumen',
    'solicitudContratacion','contratos','suplementoResumen']});
  }

  async findOne(id: number) : Promise<NegociacionResumen> {
    return await this.negociacionResumenRepository.findOne(id,{ relations: ['negociacionProveedores',
    'fichaCompraResumen','solicitudContratacion','contratos','suplementoResumen']});
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
}
