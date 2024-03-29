import { TiposDeComprasService } from './../tipos-de-compras/tipos-de-compras.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { In, Repository } from 'typeorm';
import { CreateNegociacionResumenInput } from './dto/create-negociacion-resumen.input';
import { LogsService } from 'src/logs/logs.service';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { NegociacionProveedoresService } from 'src/negociacion-proveedores/negociacion-proveedores.service';
import { CreateNegociacionProveedoresInput } from 'src/negociacion-proveedores/dto/create-negociacion-proveedores.input';
import { CreateContratoMarcoInput } from 'src/contrato-marco/dto/create-contrato-marco.input';
import { ContratoMarcoService } from 'src/contrato-marco/contrato-marco.service';

@Injectable()
export class NegociacionResumenService {
  constructor(@InjectRepository(NegociacionResumen) public readonly negociacionResumenRepository: Repository<NegociacionResumen>,
  private logsService: LogsService,private negociacionProveedoresService: NegociacionProveedoresService, private contratoMarcoService: ContratoMarcoService) {}


  async save(usuarioToken: Usuarios,createNegociacionResumenInput: CreateNegociacionResumenInput) : Promise<NegociacionResumen> {
    var today = new Date();
    var esNuevo = false;
    var result: NegociacionResumen;
    
    if(createNegociacionResumenInput.idNegociacion){
      esNuevo = false;
      var negociacionVieja = await this.findOne(createNegociacionResumenInput.idNegociacion);
      let importeViejo = negociacionVieja.importeCuc;
      

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

      let contratoMarco = new CreateContratoMarcoInput();

      if(negociacionVieja.contratos){
        let contratoMarcoViejo = negociacionVieja.contratos[0].contratoMarco;
        contratoMarco.idCMarco = contratoMarcoViejo.idCMarco;
        contratoMarco.idProveedor = contratoMarcoViejo.idProveedor;
        contratoMarco.fecha = contratoMarcoViejo.fecha;
        contratoMarco.consecutivo = contratoMarcoViejo.consecutivo;
        contratoMarco.monto = contratoMarcoViejo.monto;
        contratoMarco.contratado = contratoMarcoViejo.contratado - importeViejo + importeCUC;
        contratoMarco.pendiente = contratoMarco.monto - contratoMarco.contratado;
        contratoMarco.creado = contratoMarcoViejo.creado;
        contratoMarco.actualizado = new Date();

        this.contratoMarcoService.save(contratoMarco);
      }
      

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
    }, relations: ['negociacionProveedores','solicitudContratacion','grupos','monedas','tiposDeCompras']});
  }

  async findOne(id: number) : Promise<NegociacionResumen> {
    return await this.negociacionResumenRepository.findOne({where: {idNegociacion: id}, relations: ['negociacionProveedores','solicitudContratacion',
    'grupos','monedas','tiposDeCompras']});
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
    const negociacionResumen = await this.negociacionResumenRepository.findBy({
      idNegociacion: In(id)
  });
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
}
