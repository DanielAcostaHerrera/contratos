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
import { MonedaService } from 'src/moneda/moneda.service';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { PaisesService } from 'src/paises/paises.service';
import { Repository } from 'typeorm';
import { CreateContratoInput } from './dto/create-contrato.input';
import { LogsService } from 'src/logs/logs.service';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { ContratoMarcoService } from 'src/contrato-marco/contrato-marco.service';
import { ContratoMarco } from 'src/models/entities/ContratoMarco.entity';
import { ContratoClausulaService } from 'src/contrato-clausulas/contrato-clausulas.service';
import { CreateContratoClausulaInput } from 'src/contrato-clausulas/dto/create-contrato-clausulas.input';
import { CreateSuplementoResumanInput } from 'src/suplemento-resumen/dto/create-suplemento-resuman.input';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { CreateSuplementoClausulaInput } from 'src/suplemento-clausulas/dto/create-suplemento-clausula.input';
import { SuplementoClausulasService } from 'src/suplemento-clausulas/suplemento-clausulas.service';
import { CreateSuplementoChangeInput } from 'src/suplemento-change/dto/create-suplemento-change.input';
import { SuplementoChangeService } from 'src/suplemento-change/suplemento-change.service';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';

@Injectable()
export class ContratosService {
  constructor(@InjectRepository(Contratos) public readonly contratoRepository: Repository<Contratos>,private companiasNavierasService: CompaniasNavierasService,
  private basesGeneralesService: BasesGeneralesService,private contratoMarcoService: ContratoMarcoService,private monedaService: MonedaService,
  private formasEntregaService: FormasEntregaService,private negociacionResumenService: NegociacionResumenService,
  private fichaCostoResumenService: FichaCostoResumenService,private ejecutivoService: EjecutivoService,
  private paisesService: PaisesService,private logsService: LogsService,
  private agenciasAseguradorasService: AgenciasAseguradorasService, private incotermService: IncotermService,
  private contratoClausulaService: ContratoClausulaService, private suplementoResumenService: SuplementoResumenService,
  private suplementoClausulasService: SuplementoClausulasService, private suplementoChangeService: SuplementoChangeService) {}


  async save(usuarioToken: Usuarios,createContratoInput: CreateContratoInput) : Promise<Contratos> {
    return new Promise<Contratos>(async (resolve, reject) => {
    var esNuevo = true;
    var result: Contratos;
    if(createContratoInput.idContrato){
      esNuevo = false;
      var contratoViejo = await this.findOne(createContratoInput.idContrato);
      var negociacion = await this.negociacionResumenService.findOne(createContratoInput.idNegociacion);

      if(createContratoInput.idCMarco){
        var contratoMarco = await this.contratoMarcoService.findOne(createContratoInput.idCMarco);
        contratoMarco.contratado += negociacion.importeCuc;
        if(createContratoInput.gastosLogisticos){
          contratoMarco.contratado += createContratoInput.gastosLogisticos;
        }
        if(contratoMarco.contratado > contratoMarco.monto){
          reject("El monto que intenta insertar excede el saldo disponible");
        }
        else{
          this.contratoMarcoService.save(contratoMarco);
        }
      }

      let suplementoChange = new CreateSuplementoChangeInput();

      var suplementoResumen = new CreateSuplementoResumanInput();
      suplementoResumen.idContrato = createContratoInput.idContrato;
      suplementoResumen.suplementadoPor = usuarioToken.idEjecutivo;
      suplementoResumen.fecha = new Date();
      suplementoResumen.operacion = negociacion.operacion;
      suplementoResumen.modificado = false;
      suplementoResumen.terminadoS = false;
      
      suplementoResumen.idEjecutivo = createContratoInput.realizadoPor;
      if(contratoViejo.realizadoPor != createContratoInput.realizadoPor){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.realizadoPor.toString();
        suplementoChange.contenidoNuevo = createContratoInput.realizadoPor.toString();    
        suplementoChange.clausula = "Realizado por";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.firma = createContratoInput.firmadoPor;
      if(contratoViejo.firmadoPor != createContratoInput.firmadoPor){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.firmadoPor.toString();
        suplementoChange.contenidoNuevo = createContratoInput.firmadoPor.toString();    
        suplementoChange.clausula = "Firmado por";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.idMoneda = createContratoInput.idMoneda;
      if(contratoViejo.idMoneda != createContratoInput.idMoneda){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.idMoneda.toString();
        suplementoChange.contenidoNuevo = createContratoInput.idMoneda.toString();    
        suplementoChange.clausula = "Moneda usada";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.idEmpSeguro = createContratoInput.idEmpresaSeguro;
      if(contratoViejo.idEmpresaSeguro != createContratoInput.idEmpresaSeguro){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.idEmpresaSeguro.toString();
        suplementoChange.contenidoNuevo = createContratoInput.idEmpresaSeguro.toString();    
        suplementoChange.clausula = "Empresa de seguros";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.idEmpNaviera = createContratoInput.idEmpresaNaviera;
      if(contratoViejo.idEmpresaNaviera != createContratoInput.idEmpresaNaviera){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.idEmpresaNaviera.toString();
        suplementoChange.contenidoNuevo = createContratoInput.idEmpresaNaviera.toString();    
        suplementoChange.clausula = "Empresa naviera";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.lugarEntrega = createContratoInput.lugarEntrega;
      if(contratoViejo.lugarEntrega != createContratoInput.lugarEntrega){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.lugarEntrega.toString();
        suplementoChange.contenidoNuevo = createContratoInput.lugarEntrega.toString();    
        suplementoChange.clausula = "Lugar de Entrega";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.cancelado = createContratoInput.cancelado;
      if(contratoViejo.cancelado != createContratoInput.cancelado){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.cancelado.toString();
        suplementoChange.contenidoNuevo = createContratoInput.cancelado.toString();    
        suplementoChange.clausula = "Cancelado";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.notas = createContratoInput.notas;
      if(contratoViejo.notas != createContratoInput.notas){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.notas.toString();
        suplementoChange.contenidoNuevo = createContratoInput.notas.toString();    
        suplementoChange.clausula = "Notas";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.permitirEmbarquesParciales = createContratoInput.permitirEmbarquesParciales;
      if(contratoViejo.permitirEmbarquesParciales != createContratoInput.permitirEmbarquesParciales){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.permitirEmbarquesParciales.toString();
        suplementoChange.contenidoNuevo = createContratoInput.permitirEmbarquesParciales.toString();    
        suplementoChange.clausula = "Permitir embarques parciales";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.cantidadEp = createContratoInput.cantidadEp;
      if(contratoViejo.cantidadEp != createContratoInput.cantidadEp){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.cantidadEp.toString();
        suplementoChange.contenidoNuevo = createContratoInput.cantidadEp.toString();    
        suplementoChange.clausula = "Cantidad EP";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.permitirEntregas = createContratoInput.permitirEntregas;
      if(contratoViejo.permitirEntregas != createContratoInput.permitirEntregas){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.permitirEntregas.toString();
        suplementoChange.contenidoNuevo = createContratoInput.permitirEntregas.toString();    
        suplementoChange.clausula = "Permitir entregas";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.permitirTrasbordos = createContratoInput.permitirTrasbordos;
      if(contratoViejo.permitirTrasbordos != createContratoInput.permitirTrasbordos){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.permitirTrasbordos.toString();
        suplementoChange.contenidoNuevo = createContratoInput.permitirTrasbordos.toString();    
        suplementoChange.clausula = "Permitir trasbordos";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.producto = createContratoInput.producto;
      if(contratoViejo.producto != createContratoInput.producto){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.producto.toString();
        suplementoChange.contenidoNuevo = createContratoInput.producto.toString();    
        suplementoChange.clausula = "Producto";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.noEntregasParciales = createContratoInput.noEntregasParciales;
      if(contratoViejo.noEntregasParciales != createContratoInput.noEntregasParciales){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.noEntregasParciales.toString();
        suplementoChange.contenidoNuevo = createContratoInput.noEntregasParciales.toString();    
        suplementoChange.clausula = "Numero de entregas parciales";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.fInicial = createContratoInput.fechaInicial;
      if(contratoViejo.fechaInicial != createContratoInput.fechaInicial){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.fechaInicial.toString();
        suplementoChange.contenidoNuevo = createContratoInput.fechaInicial.toString();    
        suplementoChange.clausula = "Fecha Inicial";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.fFinal = createContratoInput.fechaFinal;
      if(contratoViejo.fechaFinal != createContratoInput.fechaFinal){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.fechaFinal.toString();
        suplementoChange.contenidoNuevo = createContratoInput.fechaFinal.toString();    
        suplementoChange.clausula = "Fecha Final";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.fFirma = createContratoInput.fechaFirma;
      if(contratoViejo.fechaFirma != createContratoInput.fechaFirma){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.fechaFirma.toString();
        suplementoChange.contenidoNuevo = createContratoInput.fechaFirma.toString();    
        suplementoChange.clausula = "Fecha de firma";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.fRecepcion = createContratoInput.fechaRecepcion;
      if(contratoViejo.fechaRecepcion != createContratoInput.fechaRecepcion){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.fechaRecepcion.toString();
        suplementoChange.contenidoNuevo = createContratoInput.fechaRecepcion.toString();    
        suplementoChange.clausula = "Fecha de recepcion";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.fArribo = createContratoInput.fechaArribo;
      if(contratoViejo.fechaArribo != createContratoInput.fechaArribo){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.fechaArribo.toString();
        suplementoChange.contenidoNuevo = createContratoInput.fechaArribo.toString();    
        suplementoChange.clausula = "Fecha de arribo";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.financiamiento = createContratoInput.financiamiento;
      if(contratoViejo.financiamiento != createContratoInput.financiamiento){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.financiamiento.toString();
        suplementoChange.contenidoNuevo = createContratoInput.financiamiento.toString();    
        suplementoChange.clausula = "Financiamiento";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.tasaMoneda = createContratoInput.tasaMoneda;
      if(contratoViejo.tasaMoneda != createContratoInput.tasaMoneda){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.tasaMoneda.toString();
        suplementoChange.contenidoNuevo = createContratoInput.tasaMoneda.toString();    
        suplementoChange.clausula = "Tasa de la moneda";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.fechaTasa = createContratoInput.fechaTasa;
      if(contratoViejo.fechaTasa != createContratoInput.fechaTasa){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.fechaTasa.toString();
        suplementoChange.contenidoNuevo = createContratoInput.fechaTasa.toString();    
        suplementoChange.clausula = "Fecha de la tasa";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.fechaPFirma = createContratoInput.fechaPFirma;
      if(contratoViejo.fechaPFirma != createContratoInput.fechaPFirma){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.fechaPFirma.toString();
        suplementoChange.contenidoNuevo = createContratoInput.fechaPFirma.toString();    
        suplementoChange.clausula = "Fecha firma proveedor";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.pFin = createContratoInput.pFin;
      if(contratoViejo.pFin != createContratoInput.pFin){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.pFin.toString();
        suplementoChange.contenidoNuevo = createContratoInput.pFin.toString();    
        suplementoChange.clausula = "pFin";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.idNegociacion = createContratoInput.idNegociacion;
      if(contratoViejo.idNegociacion != createContratoInput.idNegociacion){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.idNegociacion.toString();
        suplementoChange.contenidoNuevo = createContratoInput.idNegociacion.toString();    
        suplementoChange.clausula = "Negociacion";
        this.suplementoChangeService.save(suplementoChange);
      }
      
      suplementoResumen.gastosLogisticos = createContratoInput.gastosLogisticos;
      if(contratoViejo.gastosLogisticos != createContratoInput.gastosLogisticos){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.gastosLogisticos.toString();
        suplementoChange.contenidoNuevo = createContratoInput.gastosLogisticos.toString();    
        suplementoChange.clausula = "Gastos logisticos";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.lugarFirma = createContratoInput.lugarFirma;
      if(contratoViejo.lugarFirma != createContratoInput.lugarFirma){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.lugarFirma.toString();
        suplementoChange.contenidoNuevo = createContratoInput.lugarFirma.toString();    
        suplementoChange.clausula = "Lugar de firma";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.idPais = createContratoInput.idPais;
      if(contratoViejo.idPais != createContratoInput.idPais){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.idPais.toString();
        suplementoChange.contenidoNuevo = createContratoInput.idPais.toString();    
        suplementoChange.clausula = "Pais";
        this.suplementoChangeService.save(suplementoChange);
      }

      suplementoResumen.idIncoterm = createContratoInput.idIncoterm;
      if(contratoViejo.idIncoterm != createContratoInput.idIncoterm){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contratoViejo.idIncoterm.toString();
        suplementoChange.contenidoNuevo = createContratoInput.idIncoterm.toString();    
        suplementoChange.clausula = "Condicion de compra";
        this.suplementoChangeService.save(suplementoChange);
      }
    
      
      if(!contratoViejo.suplementoResumen){
        suplementoResumen.origen = "A"+contratoViejo.idContrato.toString();
      }
      else{
        suplementoResumen.origen = "S"+contratoViejo.suplementoResumen[0].idSuplementoResumen.toString();
      }
      
      let resumenSuplemento = await this.suplementoResumenService.save(suplementoResumen);

      let clausulas = createContratoInput.contratoClausulas;
      for (let index = 0; index < clausulas.length; index++) {
        const clausula = clausulas[index];
        const clausulaVieja = contratoViejo.contratoClausulas.find(clausula=> clausula.noClausula == clausula.noClausula)
        
        var suplementoClausula = new CreateSuplementoClausulaInput();
        suplementoClausula.idSuplementoResumen = resumenSuplemento.idSuplementoResumen;
        suplementoClausula.idContrato = createContratoInput.idContrato;
        suplementoClausula.noClausula = clausula.noClausula;
        suplementoClausula.txClausula = clausula.contenido;
        if(clausulaVieja.contenido == suplementoClausula.txClausula){
          suplementoClausula.modificada = false;
        }
        else{
          suplementoClausula.modificada = true;

          suplementoChange.idEmbarque = null;
          suplementoChange.orden = suplementoClausula.noClausula;
          suplementoChange.idCambio = 1;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = clausulaVieja.contenido.toString();
          suplementoChange.contenidoNuevo = clausula.contenido.toString();    
          suplementoChange.clausula = "Cambio en las clausulas";
          this.suplementoChangeService.save(suplementoChange);                 
        }
         
        await this.suplementoClausulasService.save(suplementoClausula);        
      }
      
    let contrato: Contratos;
    contrato.idBasesGenerales = createContratoInput.idBasesGenerales;
    contrato.idCMarco = createContratoInput.idCMarco;
    contrato.idMoneda = createContratoInput.idMoneda;
    contrato.idFormaEntrega = createContratoInput.idFormaEntrega;
    contrato.idNegociacion = createContratoInput.idNegociacion;
    contrato.idFichaCosto = createContratoInput.idFichaCosto;
    contrato.idIncoterm = createContratoInput.idIncoterm;
    contrato.realizadoPor = createContratoInput.realizadoPor;
    contrato.firmadoPor = createContratoInput.firmadoPor;
    contrato.modificadoPor = createContratoInput.modificadoPor;
    contrato.lugarFirma = createContratoInput.lugarFirma;
    contrato.consecutivo = createContratoInput.consecutivo;
    contrato.idPais = createContratoInput.idPais
    contrato.cancelado = createContratoInput.cancelado;
    contrato.terminado = createContratoInput.terminado;
    contrato.modificado = createContratoInput.modificado;
    contrato.idEmpresaSeguro = createContratoInput.idEmpresaSeguro;
    contrato.idEmpresaNaviera = createContratoInput.idEmpresaNaviera;
    contrato.lugarEntrega = createContratoInput.lugarEntrega;
    contrato.notas = createContratoInput.notas;
    contrato.permitirEmbarquesParciales = createContratoInput.permitirEmbarquesParciales;
    contrato.cantidadEp = createContratoInput.cantidadEp;
    contrato.permitirEntregas = createContratoInput.permitirEntregas;
    contrato.permitirTrasbordos = createContratoInput.permitirTrasbordos;
    contrato.producto = createContratoInput.producto;
    contrato.noEntregasParciales = createContratoInput.noEntregasParciales;
    contrato.fechaElaboracion = createContratoInput.fechaElaboracion;
    contrato.fechaInicial = createContratoInput.fechaInicial;
    contrato.fechaFinal = createContratoInput.fechaFinal;
    contrato.fechaFirma = createContratoInput.fechaFirma;
    contrato.fechaRecepcion = createContratoInput.fechaRecepcion;
    contrato.fechaArribo = createContratoInput.fechaArribo;
    contrato.fechaPFirma = createContratoInput.fechaPFirma;
    contrato.financiamiento = createContratoInput.financiamiento;
    contrato.tasaMoneda = createContratoInput.tasaMoneda;
    contrato.fechaTasa = createContratoInput.fechaTasa;
    contrato.pFin = createContratoInput.pFin;
    contrato.gastosLogisticos = createContratoInput.gastosLogisticos;

    resolve(contrato);
    }

    if(!createContratoInput.idContrato){
      esNuevo = true;
      var baseGeneral = await this.basesGeneralesService.findOne(createContratoInput.idBasesGenerales);
      var negociacion = await this.negociacionResumenService.findOne(createContratoInput.idNegociacion);
      var cantContratos = baseGeneral.contratos.length;
      createContratoInput.consecutivo = cantContratos+1;

      createContratoInput.cancelado = false;
      createContratoInput.modificado = false;
      createContratoInput.terminado = false;
      createContratoInput.fechaElaboracion = new Date();

      if(createContratoInput.idCMarco){
        var contratoMarco = await this.contratoMarcoService.findOne(createContratoInput.idCMarco);
        contratoMarco.contratado += negociacion.importeCuc;
        if(createContratoInput.gastosLogisticos){
          contratoMarco.contratado += createContratoInput.gastosLogisticos;
        }
        if(contratoMarco.contratado > contratoMarco.monto){
          reject("El monto que intenta insertar excede el saldo disponible");
        }
        else{
          this.contratoMarcoService.save(contratoMarco);
        }
      }

      result = await this.contratoRepository.save(createContratoInput);

      if(result){
        let clausulas = createContratoInput.contratoClausulas;
        for (let index = 0; index < clausulas.length; index++) {
          const clausula = clausulas[index];
          
          var contratoClausula = new CreateContratoClausulaInput();
          contratoClausula.idContrato = clausula.idContrato;
          contratoClausula.contenido = clausula.contenido;
          contratoClausula.noClausula = clausula.noClausula;
          contratoClausula.idContratoClausulas = clausula.idContratoClausulas;
          
          await this.contratoClausulaService.save(contratoClausula)        
        }
      }
    }
 
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
     resolve(result);
  });
  }

  async findAll(): Promise<Contratos[]> {
    let contratos = await this.contratoRepository.find({relations:['contratoClausulas','documentacionContratos','embarques','facturaResumen','fichaCompraResumen',
    'suplementoEmbarques','suplementoResumen','suplementoClausulas']});
    contratos.forEach(element => {
      element.suplementoResumen.sort((a, b) => (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds())
      - (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds()));
    })
    return contratos;
  }

  async findOne(id: number) : Promise<Contratos> {
      let contrato = await this.contratoRepository.findOne(id,{relations:['contratoClausulas','documentacionContratos','embarques','facturaResumen','fichaCompraResumen',
      'suplementoEmbarques','suplementoResumen','suplementoClausulas']});

      if(contrato.suplementoResumen){
        contrato.suplementoResumen.sort((a, b) => (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds())
      - (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds()));

      let ultimoSuplemento = contrato.suplementoResumen[0];
      contrato.idBasesGenerales = contrato.idBasesGenerales;
      contrato.idFichaCosto = contrato.idFichaCosto;
      contrato.idCMarco = contrato.idCMarco;
      contrato.idMoneda = ultimoSuplemento.idMoneda;
      contrato.idFormaEntrega = ultimoSuplemento.idFormaEntrega;
      contrato.idNegociacion = ultimoSuplemento.idNegociacion;
      contrato.idIncoterm = ultimoSuplemento.idIncoterm;
      contrato.realizadoPor = contrato.realizadoPor;
      contrato.firmadoPor = ultimoSuplemento.firma;
      contrato.modificadoPor = ultimoSuplemento.suplementadoPor;
      contrato.lugarFirma = ultimoSuplemento.lugarFirma;
      contrato.consecutivo = ultimoSuplemento.consecutivo;
      contrato.idPais = ultimoSuplemento.idPais
      contrato.cancelado = ultimoSuplemento.cancelado;
      contrato.terminado = ultimoSuplemento.terminadoS;
      contrato.modificado = ultimoSuplemento.modificado;
      contrato.idEmpresaSeguro = ultimoSuplemento.idEmpSeguro;
      contrato.idEmpresaNaviera = ultimoSuplemento.idEmpNaviera;
      contrato.lugarEntrega = ultimoSuplemento.lugarEntrega;
      contrato.notas = ultimoSuplemento.notas;
      contrato.permitirEmbarquesParciales = ultimoSuplemento.permitirEmbarquesParciales;
      contrato.cantidadEp = ultimoSuplemento.cantidadEp;
      contrato.permitirEntregas = ultimoSuplemento.permitirEntregas;
      contrato.permitirTrasbordos = ultimoSuplemento.permitirTrasbordos;
      contrato.producto = ultimoSuplemento.producto;
      contrato.noEntregasParciales = ultimoSuplemento.noEntregasParciales;
      contrato.fechaElaboracion = ultimoSuplemento.fecha;
      contrato.fechaInicial = ultimoSuplemento.fInicial;
      contrato.fechaFinal = ultimoSuplemento.fFinal;
      contrato.fechaFirma = ultimoSuplemento.fFirma;
      contrato.fechaRecepcion = ultimoSuplemento.fRecepcion;
      contrato.fechaArribo = ultimoSuplemento.fArribo;
      contrato.fechaPFirma = ultimoSuplemento.fechaPFirma;
      contrato.financiamiento = ultimoSuplemento.financiamiento;
      contrato.tasaMoneda = ultimoSuplemento.tasaMoneda;
      contrato.fechaTasa = ultimoSuplemento.fechaTasa;
      contrato.pFin = ultimoSuplemento.pFin;
      contrato.gastosLogisticos = ultimoSuplemento.gastosLogisticos;

      let clausulasContrato: ContratoClausulas[];
      let clausulasSuplemento = ultimoSuplemento.suplementoClausulas;
      
      for (let index = 0; index < clausulasSuplemento.length; index++) {
        const clausula = clausulasSuplemento[index];
        
        var contratoClausula = new ContratoClausulas();
        contratoClausula.idContrato = clausula.idContrato;
        contratoClausula.contenido = clausula.txClausula;
        contratoClausula.noClausula = clausula.noClausula;
        contratoClausula.idContratoClausulas = null;
        
        clausulasContrato.push(contratoClausula)        
      }
      contrato.contratoClausulas = clausulasContrato;
    }
    return contrato;
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
