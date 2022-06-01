import { CompaniasNavieras } from './../modelsNomgen/entities/CompaniasNavieras.entity';
import { AgenciasAseguradoras } from './../modelsNomgen/entities/AgenciasAseguradoras.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgenciasAseguradorasService } from 'src/agencias-aseguradoras/agencias-aseguradoras.service';
import { BasesGeneralesService } from 'src/bases-generales/bases-generales.service';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { FichaCostoResumenService } from 'src/ficha-costo-resumen/ficha-costo-resumen.service';
import { FormasEntregaService } from 'src/formas-entrega/formas-entrega.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { FichaCostoResumen } from 'src/models/entities/FichaCostoResumen.entity';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { MonedaService } from 'src/moneda/moneda.service';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { PaisesService } from 'src/paises/paises.service';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { Repository } from 'typeorm';
import { CreateContratoInput } from './dto/create-contrato.input';
import { LogsService } from 'src/logs/logs.service';
import { MyLogger } from 'src/MyLogger';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { ContratoMarcoService } from 'src/contrato-marco/contrato-marco.service';
import { ContratoMarco } from 'src/models/entities/ContratoMarco.entity';

@Injectable()
export class ContratosService {
  constructor(@InjectRepository(Contratos) public readonly contratoRepository: Repository<Contratos>,private companiasNavierasService: CompaniasNavierasService,
  private basesGeneralesService: BasesGeneralesService,private contratoMarcoService: ContratoMarcoService,private monedaService: MonedaService,
  private formasEntregaService: FormasEntregaService,private negociacionResumenService: NegociacionResumenService,
  private fichaCostoResumenService: FichaCostoResumenService,private ejecutivoService: EjecutivoService,
  private paisesService: PaisesService,private proveedoresService: ProveedoresService,private logsService: LogsService,
  private agenciasAseguradorasService: AgenciasAseguradorasService, private incotermService: IncotermService) {}


  async save(usuarioToken: Usuarios,createContratoInput: CreateContratoInput) : Promise<Contratos> {
    var esNuevo = true;
    if(createContratoInput.idContrato){
      esNuevo = false;
      var contratoViejo = await this.findOne(createContratoInput.idContrato);
    }

    if(!createContratoInput.idContrato){
      esNuevo = true;
      var baseGeneral = await this.basesGeneralesService.findOne(createContratoInput.idBasesGenerales);
      var cantContratos = baseGeneral.contratos.length;
      createContratoInput.consecutivo = cantContratos+1;
    }

    var result = await this.contratoRepository.save(createContratoInput);
    if(result && esNuevo){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Insertado un nuevo contrato con número consecutivo "+result.consecutivo+"");
    }
    if(result && !esNuevo){
      var texto = "Modificado el contrato con número consecutivo "+result.consecutivo+"";
        if(contratoViejo.idBasesGenerales != result.idBasesGenerales){
          texto += ", cambiada la base general empleada";
        }
        if(contratoViejo.idCMarco != result.idCMarco){
          texto += ", cambiada la base de contrato marco empleada";
        }
        if(contratoViejo.idMoneda != result.idMoneda){
          texto += ", cambiada la moneda";
        }
        if(contratoViejo.idFormaEntrega != result.idFormaEntrega){
          texto += ", cambiada la forma de entrega";
        }
        if(contratoViejo.realizadoPor != result.realizadoPor){
          texto += ", cambiado el ejecutivo que realiza el contrato";
        }
        if(contratoViejo.firmadoPor != result.firmadoPor){
          texto += ", cambiado el ejecutivo que firma el contrato";
        }
        if(contratoViejo.modificadoPor != result.modificadoPor){
          texto += ", cambiado el ejecutivo que modifica el contrato";
        }
        if(contratoViejo.lugarFirma != result.lugarFirma){
          texto += ", cambiado el lugar de firma";
        }
        if(contratoViejo.idIncoterm != result.idIncoterm){
          texto += ", cambiada la condición de compra";
        }
        if(contratoViejo.idPais != result.idPais){
          texto += ", cambiado el pais";
        }
        if(contratoViejo.cancelado != result.cancelado){
          texto += ", cambiado el estado de cancelado";
        }
        if(contratoViejo.terminado != result.terminado){
          texto += ", cambiado el estado de terminado";
        }
        if(contratoViejo.modificado != result.modificado){
          texto += ", cambiada la fecha de modificado";
        }
        if(contratoViejo.idProveedor != result.idProveedor){
          texto += ", cambiado el proveedor";
        }
        if(contratoViejo.idEmpresaSeguro != result.idEmpresaSeguro){
          texto += ", cambiada la empresa de seguros";
        }
        if(contratoViejo.idEmpresaNaviera != result.idEmpresaNaviera){
          texto += ", cambiada la empresa naviera";
        }
        if(contratoViejo.lugarEntrega != result.lugarEntrega){
          texto += ", cambiado el lugar de entrega";
        }
        if(contratoViejo.notas != result.notas){
          texto += ", cambiadas las notas";
        }
        if(contratoViejo.permitirEmbarquesParciales != result.permitirEmbarquesParciales){
          texto += ", cambiada la capacidad de permitir embarques parciales";
        }
        if(contratoViejo.cantidadEp != result.cantidadEp){
          texto += ", cambiada la cantidadEP";
        }
        if(contratoViejo.permitirEntregas != result.permitirEntregas){
          texto += ", cambiada la capacidad de permitir entregas";
        }
        if(contratoViejo.permitirTrasbordos != result.permitirTrasbordos){
          texto += ", cambiada la capacidad de permitir trasbordos";
        }
        if(contratoViejo.producto != result.producto){
          texto += ", cambiados los productos";
        }
        if(contratoViejo.noEntregasParciales != result.noEntregasParciales){
          texto += ", cambiado el número de entregas parciales";
        }
        if(contratoViejo.fechaElaboracion != result.fechaElaboracion){
          texto += ", cambiada la fecha de elaboración";
        }
        if(contratoViejo.fechaInicial != result.fechaInicial){
          texto += ", cambiada la fecha inicial";
        }
        if(contratoViejo.fechaFinal != result.fechaFinal){
          texto += ", cambiada la fecha final";
        }
        if(contratoViejo.fechaFirma != result.fechaFirma){
          texto += ", cambiada la fecha de firma";
        }
        if(contratoViejo.fechaRecepcion != result.fechaRecepcion){
          texto += ", cambiada la fecha de recepción";
        }
        if(contratoViejo.fechaArribo != result.fechaArribo){
          texto += ", cambiada la fecha de arribo";
        }
        if(contratoViejo.fechaPFirma != result.fechaPFirma){
          texto += ", cambiada la fechaPFirma";
        }
        if(contratoViejo.financiamiento != result.financiamiento){
          texto += ", cambiado el financiamiento";
        }
        if(contratoViejo.tasaMoneda != result.tasaMoneda){
          texto += ", cambiada la tasa de la moneda";
        }
        if(contratoViejo.fechaTasa != result.fechaTasa){
          texto += ", cambiada la fecha de la tasa";
        }
        if(contratoViejo.pFin != result.pFin){
          texto += ", cambiado el precio final";
        }
        if(contratoViejo.gastosLogisticos != result.gastosLogisticos){
          texto += ", cambiados los gastos logísticos";
        }
        await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);
    }
    return result;
  }

  async findAll(): Promise<Contratos[]> {
    return await this.contratoRepository.find({relations:['contratoClausulas','documentacionContratos','embarques','facturaResumen','fichaCompraResumen',
    'suplementoEmbarques','suplementoResumen']});
  }

  async findOne(id: number) : Promise<Contratos> {
    return await this.contratoRepository.findOne(id,{relations:['contratoClausulas','documentacionContratos','embarques','facturaResumen','fichaCompraResumen',
    'suplementoEmbarques','suplementoResumen']});
  }

  async remove(usuarioToken: Usuarios,id: number) : Promise<any> {
    const contratos = await this.findOne(id);
    var result = await this.contratoRepository.remove(contratos);
    if(result){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Eliminado el contrato con número consecutivo "+result.consecutivo+"");
    }
    
    return result;
  }

  async removeSeveral(usuarioToken: Usuarios,id: number[]) : Promise<any> {
    const contratos = await this.contratoRepository.findByIds(id);
    var result = await this.contratoRepository.remove(contratos);
    if(result){
      var texto = "Eliminados los contratos con números consecutivos ";
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

  async getBasesGenerales (Id: number) : Promise<BasesGenerales>{
    return this.basesGeneralesService.findOne(Id);
  }

  async getCMarco (Id: number) : Promise<ContratoMarco>{
    return this.contratoMarcoService.findOne(Id);
  }

  async getMoneda (Id: number) : Promise<Monedas>{
    return this.monedaService.findOne(Id);
  }

  async getFormaEntrega (Id: number) : Promise<FormasEntrega>{
    return this.formasEntregaService.findOne(Id);
  }

  async getNegociacionResumen (Id: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(Id);
  }

  async getFichaCostoResumen (Id: number) : Promise<FichaCostoResumen>{
    return this.fichaCostoResumenService.findOne(Id);
  }

  async getEjecutivoRealiza (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getEjecutivoFirma (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getEjecutivoModifica (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getPais (Id: number) : Promise<Paises>{
    return this.paisesService.findOne(Id);
  }

  async getProveedor (Id: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(Id);
  }

  async getEmpresaAseguradora (Id: number) : Promise<AgenciasAseguradoras>{
    return this.agenciasAseguradorasService.findOne(Id);
  }

  async getEmpresaNaviera (Id: number) : Promise<CompaniasNavieras>{
    return this.companiasNavierasService.findOne(Id);
  }

  async getIncoterm (Id: number) : Promise<Incoterm>{
    return this.incotermService.findOne(Id);
  }
}
