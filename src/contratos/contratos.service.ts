import { Int } from '@nestjs/graphql';
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
import { CreateSuplementoEmbarqueInput } from 'src/suplemento-embarques/dto/create-suplemento-embarque.input';
import { SuplementoEmbarquesService } from 'src/suplemento-embarques/suplemento-embarques.service';
import { CreateSuplementoDesgloseInput } from 'src/suplemento-desglose/dto/create-suplemento-desglose.input';
import { SuplementoDesgloseService } from 'src/suplemento-desglose/suplemento-desglose.service';
import { CreateEmbarqueInput } from 'src/embarques/dto/create-embarque.input';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { CreateContratoDesgloseInput } from 'src/contrato-desglose/dto/create-contrato-desglose.input';
import { ContratoDesgloseService } from 'src/contrato-desglose/contrato-desglose.service';
import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { CreatePuertoEmbarqueInput } from 'src/puerto-embarque/dto/create-puerto-embarque.input';
import { PuertoEmbarqueService } from 'src/puerto-embarque/puerto-embarque.service';

@Injectable()
export class ContratosService {
  constructor(@InjectRepository(Contratos) public readonly contratoRepository: Repository<Contratos>,private companiasNavierasService: CompaniasNavierasService,
  private basesGeneralesService: BasesGeneralesService,private contratoMarcoService: ContratoMarcoService,private monedaService: MonedaService,
  private formasEntregaService: FormasEntregaService,private negociacionResumenService: NegociacionResumenService,
  private fichaCostoResumenService: FichaCostoResumenService,private ejecutivoService: EjecutivoService,
  private paisesService: PaisesService,private logsService: LogsService, private suplementoEmbarquesService: SuplementoEmbarquesService,
  private agenciasAseguradorasService: AgenciasAseguradorasService, private incotermService: IncotermService,
  private contratoClausulaService: ContratoClausulaService, private suplementoResumenService: SuplementoResumenService,
  private suplementoClausulasService: SuplementoClausulasService, private suplementoChangeService: SuplementoChangeService,
  private suplementoDesgloseService: SuplementoDesgloseService, private embarquesService: EmbarquesService,
  private contratoDesgloseService: ContratoDesgloseService, private codigosParaLaVentaService: CodigosParaLaVentaService,
  private puertoEmbarqueService: PuertoEmbarqueService) {}


  async anadirSuplemento(usuarioToken: Usuarios, idContrato: number) : Promise<Boolean>{
      let contrato = await this.findOne(idContrato)
      var suplementoResumen = new CreateSuplementoResumanInput();
      let suplementoEmbarque = new CreateSuplementoEmbarqueInput();
      let suplementoDesglose = new CreateSuplementoDesgloseInput();
      
      if(contrato.suplementoResumen){
      contrato.suplementoResumen.sort((a, b) => (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds())
        - (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds()));
      let ultimoSuplemento = contrato.suplementoResumen[0];

      var negociacion = await this.negociacionResumenService.findOne(ultimoSuplemento.idNegociacion);
        
        suplementoResumen.idContrato = ultimoSuplemento.idContrato;
        suplementoResumen.suplementadoPor = usuarioToken.idEjecutivo;
        suplementoResumen.fecha = new Date();
        suplementoResumen.operacion = negociacion.operacion;
        suplementoResumen.modificado = false;
        suplementoResumen.terminadoS = false;
        suplementoResumen.idEjecutivo = ultimoSuplemento.suplementadoPor;
        suplementoResumen.firma = ultimoSuplemento.firma;
        suplementoResumen.idMoneda = ultimoSuplemento.idMoneda;
        suplementoResumen.idEmpSeguro = ultimoSuplemento.idEmpSeguro;
        suplementoResumen.idEmpNaviera = ultimoSuplemento.idEmpNaviera;
        suplementoResumen.lugarEntrega = ultimoSuplemento.lugarEntrega;
        suplementoResumen.cancelado = ultimoSuplemento.cancelado;
        suplementoResumen.notas = ultimoSuplemento.notas;
        suplementoResumen.permitirEmbarquesParciales = ultimoSuplemento.permitirEmbarquesParciales;
        suplementoResumen.cantidadEp = ultimoSuplemento.cantidadEp;
        suplementoResumen.permitirEntregas = ultimoSuplemento.permitirEntregas;
        suplementoResumen.permitirTrasbordos = ultimoSuplemento.permitirTrasbordos;
        suplementoResumen.producto = ultimoSuplemento.producto;
        suplementoResumen.noEntregasParciales = ultimoSuplemento.noEntregasParciales;
        suplementoResumen.fInicial = ultimoSuplemento.fInicial;
        suplementoResumen.fFinal = ultimoSuplemento.fFinal;
        suplementoResumen.fFirma = ultimoSuplemento.fFirma;
        suplementoResumen.fRecepcion = ultimoSuplemento.fRecepcion;
        suplementoResumen.fArribo = ultimoSuplemento.fArribo;
        suplementoResumen.financiamiento = ultimoSuplemento.financiamiento;
        suplementoResumen.tasaMoneda = ultimoSuplemento.tasaMoneda;
        suplementoResumen.fechaTasa = ultimoSuplemento.fechaTasa;
        suplementoResumen.fechaPFirma = ultimoSuplemento.fechaPFirma;
        suplementoResumen.pFin = ultimoSuplemento.pFin;
        suplementoResumen.idNegociacion = ultimoSuplemento.idNegociacion;
        suplementoResumen.gastosLogisticos = ultimoSuplemento.gastosLogisticos;
        suplementoResumen.lugarFirma = ultimoSuplemento.lugarFirma;
        suplementoResumen.idPais = ultimoSuplemento.idPais;
        suplementoResumen.idIncoterm = ultimoSuplemento.idIncoterm;

        suplementoResumen.origen = "S"+ultimoSuplemento.idSuplementoResumen.toString();
        let resumenSuplemento = await this.suplementoResumenService.save(suplementoResumen);

        let clausulas = ultimoSuplemento.suplementoClausulas;
        for (let index = 0; index < clausulas.length; index++) {
            const clausula = clausulas[index];
            var suplementoClausula = new CreateSuplementoClausulaInput();
            suplementoClausula.idSuplementoResumen = resumenSuplemento.idSuplementoResumen;
            suplementoClausula.idContrato = contrato.idContrato;
            suplementoClausula.noClausula = clausula.noClausula;
            suplementoClausula.txClausula = clausula.txClausula;
            suplementoClausula.modificada = false;     
            await this.suplementoClausulasService.save(suplementoClausula);        
        }

        let embarques = ultimoSuplemento.suplementoEmbarques;
        for(let index = 0; index < embarques.length; index++){
          const embarque = embarques[index];
          
          suplementoEmbarque.idSuplementoResumen = resumenSuplemento.idSuplementoResumen;
          suplementoEmbarque.idEmbarque = embarque.idEmbarque;
          suplementoEmbarque.idContrato = embarque.idContrato;
          suplementoEmbarque.numero = embarque.numero;
          suplementoEmbarque.fechaEntrega = embarque.fechaEntrega;
          suplementoEmbarque.descuento = embarque.descuento;
          suplementoEmbarque.terminado = embarque.terminado;
          suplementoEmbarque.cancelado = embarque.cancelado;
          suplementoEmbarque.porFirmar = embarque.porFirmar;
          suplementoEmbarque.qtyCnt = embarque.qtyCnt;
          suplementoEmbarque.flete = embarque.flete;
          suplementoEmbarque.seguro = embarque.seguro;
          suplementoEmbarque.financiamiento = embarque.financiamiento;
          suplementoEmbarque.idEmpresaNaviera = embarque.idEmpresaNaviera;
          suplementoEmbarque.inspeccion = embarque.inspeccion;
          suplementoEmbarque.otros = embarque.otros;
          suplementoEmbarque.c40 = embarque.c40;
          suplementoEmbarque.c20 = embarque.c20;

          let embarqueSuplemento = await this.suplementoEmbarquesService.save(suplementoEmbarque);

          //Aqui se añaden los suplementos PuertoEmbarque
          
          let desgloses = embarque.suplementoResumen.suplementoDesgloses.filter(embarque2=> embarque2.idEmbarque == embarque.idEmbarque);
          for (let index = 0; index < desgloses.length; index++) {
            const desglose = desgloses[index];
            suplementoDesglose.idSuplementoResumen = embarqueSuplemento.idSuplementoResumen;
            suplementoDesglose.idEmbarque = embarque.idEmbarque;
            suplementoDesglose.idReferencia = desglose.idReferencia;
            suplementoDesglose.idCodigo = desglose.idCodigo;
            suplementoDesglose.descripcionSp = desglose.descripcionSp;
            suplementoDesglose.idUnidadMedida = desglose.idUnidadMedida;
            suplementoDesglose.cantidadPorCarton = desglose.cantidadPorCarton;
            suplementoDesglose.paquete = desglose.paquete;
            suplementoDesglose.cantidadCartones = desglose.cantidadCartones;
            suplementoDesglose.volumen = desglose.volumen;
            suplementoDesglose.precio = desglose.precio;
            suplementoDesglose.precioPaquete = desglose.precioPaquete;
            suplementoDesglose.packing = desglose.packing;
            suplementoDesglose.cajas = desglose.cajas;

            await this.suplementoDesgloseService.save(suplementoDesglose);
          } 
        }

      }
      
      else if(!contrato.suplementoResumen){
        var negociacion = await this.negociacionResumenService.findOne(contrato.idNegociacion);
        
        suplementoResumen.idContrato = contrato.idContrato;
        suplementoResumen.suplementadoPor = usuarioToken.idEjecutivo;
        suplementoResumen.fecha = new Date();
        suplementoResumen.operacion = negociacion.operacion;
        suplementoResumen.modificado = false;
        suplementoResumen.terminadoS = false;
        suplementoResumen.idEjecutivo = contrato.realizadoPor;
        suplementoResumen.firma = contrato.firmadoPor;
        suplementoResumen.idMoneda = contrato.idMoneda;
        suplementoResumen.idEmpSeguro = contrato.idEmpresaSeguro;
        suplementoResumen.idEmpNaviera = contrato.idEmpresaNaviera;
        suplementoResumen.lugarEntrega = contrato.lugarEntrega;
        suplementoResumen.cancelado = contrato.cancelado;
        suplementoResumen.notas = contrato.notas;
        suplementoResumen.permitirEmbarquesParciales = contrato.permitirEmbarquesParciales;
        suplementoResumen.cantidadEp = contrato.cantidadEp;
        suplementoResumen.permitirEntregas = contrato.permitirEntregas;
        suplementoResumen.permitirTrasbordos = contrato.permitirTrasbordos;
        suplementoResumen.producto = contrato.producto;
        suplementoResumen.noEntregasParciales = contrato.noEntregasParciales;
        suplementoResumen.fInicial = contrato.fechaInicial;
        suplementoResumen.fFinal = contrato.fechaFinal;
        suplementoResumen.fFirma = contrato.fechaFirma;
        suplementoResumen.fRecepcion = contrato.fechaRecepcion;
        suplementoResumen.fArribo = contrato.fechaArribo;
        suplementoResumen.financiamiento = contrato.financiamiento;
        suplementoResumen.tasaMoneda = contrato.tasaMoneda;
        suplementoResumen.fechaTasa = contrato.fechaTasa;
        suplementoResumen.fechaPFirma = contrato.fechaPFirma;
        suplementoResumen.pFin = contrato.pFin;
        suplementoResumen.idNegociacion = contrato.idNegociacion;
        suplementoResumen.gastosLogisticos = contrato.gastosLogisticos;
        suplementoResumen.lugarFirma = contrato.lugarFirma;
        suplementoResumen.idPais = contrato.idPais;
        suplementoResumen.idIncoterm = contrato.idIncoterm;

        suplementoResumen.origen = "A"+contrato.idContrato.toString();
        let resumenSuplemento = await this.suplementoResumenService.save(suplementoResumen);

        let clausulas = contrato.contratoClausulas;
        for (let index = 0; index < clausulas.length; index++) {
            const clausula = clausulas[index];
            var suplementoClausula = new CreateSuplementoClausulaInput();
            suplementoClausula.idSuplementoResumen = resumenSuplemento.idSuplementoResumen;
            suplementoClausula.idContrato = contrato.idContrato;
            suplementoClausula.noClausula = clausula.noClausula;
            suplementoClausula.txClausula = clausula.contenido;
            suplementoClausula.modificada = false;     
            await this.suplementoClausulasService.save(suplementoClausula);        
        }

        let embarques = contrato.embarques;
        for(let index = 0; index < embarques.length; index++){
          const embarque = embarques[index];
          
          suplementoEmbarque.idSuplementoResumen = resumenSuplemento.idSuplementoResumen;
          suplementoEmbarque.idEmbarque = embarque.idEmbarque;
          suplementoEmbarque.idContrato = embarque.idContrato;
          suplementoEmbarque.numero = embarque.numero;
          suplementoEmbarque.fechaEntrega = embarque.fechaEntrega;
          suplementoEmbarque.descuento = embarque.descuento;
          suplementoEmbarque.terminado = embarque.terminado;
          suplementoEmbarque.cancelado = embarque.cancelado;
          suplementoEmbarque.porFirmar = embarque.porFirmar;
          suplementoEmbarque.qtyCnt = embarque.qtyCnt;
          suplementoEmbarque.flete = embarque.flete;
          suplementoEmbarque.seguro = embarque.seguro;
          suplementoEmbarque.financiamiento = embarque.financiamiento;
          suplementoEmbarque.idEmpresaNaviera = embarque.idEmpresaNaviera;
          suplementoEmbarque.inspeccion = embarque.inspeccion;
          suplementoEmbarque.otros = embarque.otros;
          suplementoEmbarque.c40 = embarque.c40;
          suplementoEmbarque.c20 = embarque.c20;

          let embarqueSuplemento = await this.suplementoEmbarquesService.save(suplementoEmbarque);

          //Aqui se añaden los suplementos PuertoEmbarque
          
          let desgloses = embarque.contratoDesgloses;
          for (let index = 0; index < desgloses.length; index++) {
            const desglose = desgloses[index];
            suplementoDesglose.idSuplementoResumen = embarqueSuplemento.idSuplementoResumen;
            suplementoDesglose.idEmbarque = embarque.idEmbarque;
            suplementoDesglose.idReferencia = desglose.idReferencia;
            suplementoDesglose.idCodigo = desglose.idCodigo;
            suplementoDesglose.descripcionSp = desglose.descripcionAx;
            suplementoDesglose.idUnidadMedida = desglose.idUnidadMedida;
            suplementoDesglose.cantidadPorCarton = desglose.cantidadPorCarton;
            suplementoDesglose.paquete = desglose.paquete;
            suplementoDesglose.cantidadCartones = desglose.cantidadCartones;
            suplementoDesglose.volumen = desglose.volumen;
            suplementoDesglose.precio = desglose.precio;
            suplementoDesglose.precioPaquete = desglose.precioPaquete;
            suplementoDesglose.packing = desglose.packing;
            suplementoDesglose.cajas = desglose.cajas;

            await this.suplementoDesgloseService.save(suplementoDesglose);
          } 
        }
      } 
      return true;
  }

  async comprobarDiferencias(contratoInput: CreateContratoInput): Promise<Boolean>{
    let contrato = await this.contratoRepository.findOne(contratoInput.idContrato);
    var suplementoChange = new CreateSuplementoChangeInput();

    contrato.suplementoResumen.sort((a, b) => (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds())
    - (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds()));
    let suplementoResumen = contrato.suplementoResumen[0];

    let idEjecutivo,firma,idMoneda,idEmpSeguro,idEmpNaviera,lugarEntrega,cancelado,notas,permitirEmbarquesParciales,cantidadEp,permitirEntregas,permitirTrasbordos,
    producto,noEntregasParciales,fInicial,fFinal,fFirma,fRecepcion,fArribo,financiamiento,tasaMoneda,fechaTasa,fechaPFirma,pFin,idNegociacion,gastosLogisticos,
    lugarFirma,idPais,idIncoterm;

    this.suplementoChangeService.removeSeveralBySuplementoResumenId(contrato.suplementoResumen[0].idSuplementoResumen);

    if(contrato.suplementoResumen.length == 1){
      idEjecutivo = contrato.realizadoPor;
      firma = contrato.firmadoPor;
      idMoneda = contrato.idMoneda;
      idEmpSeguro = contrato.idEmpresaSeguro;
      idEmpNaviera = contrato.idEmpresaNaviera;
      lugarEntrega = contrato.lugarEntrega;
      cancelado = contrato.cancelado;
      notas = contrato.notas;
      permitirEmbarquesParciales = contrato.permitirEmbarquesParciales;
      cantidadEp = contrato.cantidadEp;
      permitirEntregas = contrato.permitirEntregas;
      permitirTrasbordos = contrato.permitirTrasbordos;
      producto = contrato.producto;
      noEntregasParciales = contrato.noEntregasParciales;
      fInicial = contrato.fechaInicial;
      fFinal = contrato.fechaFinal;
      fFirma = contrato.fechaFirma;
      fRecepcion = contrato.fechaRecepcion;
      fArribo = contrato.fechaArribo;
      financiamiento = contrato.financiamiento;
      tasaMoneda = contrato.tasaMoneda;
      fechaTasa = contrato.fechaTasa;
      fechaPFirma = contrato.fechaPFirma;
      pFin = contrato.pFin;
      idNegociacion = contrato.idNegociacion;
      gastosLogisticos = contrato.gastosLogisticos;
      lugarFirma = contrato.lugarFirma;
      idPais = contrato.idPais;
      idIncoterm = contrato.idIncoterm;
    }

    else if(contrato.suplementoResumen.length > 1){
      contrato.suplementoResumen.sort((a, b) => (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds())
        - (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds()));
      let suplementoAnterior = contrato.suplementoResumen[1];

      idEjecutivo = suplementoAnterior.suplementadoPor;
      firma = suplementoAnterior.firma;
      idMoneda = suplementoAnterior.idMoneda;
      idEmpSeguro = suplementoAnterior.idEmpSeguro;
      idEmpNaviera = suplementoAnterior.idEmpNaviera;
      lugarEntrega = suplementoAnterior.lugarEntrega;
      cancelado = suplementoAnterior.cancelado;
      notas = suplementoAnterior.notas;
      permitirEmbarquesParciales = suplementoAnterior.permitirEmbarquesParciales;
      cantidadEp = suplementoAnterior.cantidadEp;
      permitirEntregas = suplementoAnterior.permitirEntregas;
      permitirTrasbordos = suplementoAnterior.permitirTrasbordos;
      producto = suplementoAnterior.producto;
      noEntregasParciales = suplementoAnterior.noEntregasParciales;
      fInicial = suplementoAnterior.fInicial;
      fFinal = suplementoAnterior.fFinal;
      fFirma = suplementoAnterior.fFirma;
      fRecepcion = suplementoAnterior.fRecepcion;
      fArribo = suplementoAnterior.fArribo;
      financiamiento = suplementoAnterior.financiamiento;
      tasaMoneda = suplementoAnterior.tasaMoneda;
      fechaTasa = suplementoAnterior.fechaTasa;
      fechaPFirma = suplementoAnterior.fechaPFirma;
      pFin = suplementoAnterior.pFin;
      idNegociacion = suplementoAnterior.idNegociacion;
      gastosLogisticos = suplementoAnterior.gastosLogisticos;
      lugarFirma = suplementoAnterior.lugarFirma;
      idPais = suplementoAnterior.idPais;
      idIncoterm = suplementoAnterior.idIncoterm;
    }

    if(contratoInput.realizadoPor != idEjecutivo){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = idEjecutivo.toString();
      suplementoChange.contenidoNuevo = contratoInput.realizadoPor.toString();    
      suplementoChange.clausula = "Realizado por";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.firmadoPor != firma){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = firma.toString();
      suplementoChange.contenidoNuevo = contratoInput.firmadoPor.toString();    
      suplementoChange.clausula = "Firmado por";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.idMoneda != idMoneda){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = idMoneda.toString();
      suplementoChange.contenidoNuevo = contratoInput.idMoneda.toString();    
      suplementoChange.clausula = "Moneda usada";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.idEmpresaSeguro != idEmpSeguro){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = idEmpSeguro.toString();
      suplementoChange.contenidoNuevo = contratoInput.idEmpresaSeguro.toString();    
      suplementoChange.clausula = "Empresa de seguros";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.idEmpresaNaviera != idEmpNaviera){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = idEmpNaviera.toString();
      suplementoChange.contenidoNuevo = contratoInput.idEmpresaNaviera.toString();    
      suplementoChange.clausula = "Empresa naviera";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.lugarEntrega != lugarEntrega){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = lugarEntrega.toString();
      suplementoChange.contenidoNuevo = contratoInput.lugarEntrega.toString();    
      suplementoChange.clausula = "Lugar de Entrega";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.cancelado != cancelado){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = cancelado.toString();
      suplementoChange.contenidoNuevo = contratoInput.cancelado.toString();    
      suplementoChange.clausula = "Cancelado";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.notas != notas){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = notas.toString();
      suplementoChange.contenidoNuevo = contratoInput.notas.toString();    
      suplementoChange.clausula = "Notas";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.permitirEmbarquesParciales != permitirEmbarquesParciales){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = permitirEmbarquesParciales.toString();
      suplementoChange.contenidoNuevo = contratoInput.permitirEmbarquesParciales.toString();    
      suplementoChange.clausula = "Permitir embarques parciales";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.cantidadEp != cantidadEp){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = cantidadEp.toString();
      suplementoChange.contenidoNuevo = contratoInput.cantidadEp.toString();    
      suplementoChange.clausula = "Cantidad EP";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.permitirEntregas != permitirEntregas){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = permitirEntregas.toString();
      suplementoChange.contenidoNuevo = contratoInput.permitirEntregas.toString();    
      suplementoChange.clausula = "Permitir entregas";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.permitirTrasbordos != permitirTrasbordos){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = permitirTrasbordos.toString();
      suplementoChange.contenidoNuevo = contratoInput.permitirTrasbordos.toString();    
      suplementoChange.clausula = "Permitir trasbordos";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.producto != producto){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = producto.toString();
      suplementoChange.contenidoNuevo = contratoInput.producto.toString();    
      suplementoChange.clausula = "Producto";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.noEntregasParciales != noEntregasParciales){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = noEntregasParciales.toString();
      suplementoChange.contenidoNuevo = contratoInput.noEntregasParciales.toString();    
      suplementoChange.clausula = "Numero de entregas parciales";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.fechaInicial != fInicial){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = fInicial.toString();
      suplementoChange.contenidoNuevo = contratoInput.fechaInicial.toString();    
      suplementoChange.clausula = "Fecha Inicial";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.fechaFinal != fFinal){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = fFinal.toString();
      suplementoChange.contenidoNuevo = contratoInput.fechaFinal.toString();    
      suplementoChange.clausula = "Fecha Final";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.fechaFirma != fFirma){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = fFirma.toString();
      suplementoChange.contenidoNuevo = contratoInput.fechaFirma.toString();    
      suplementoChange.clausula = "Fecha de firma";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.fechaRecepcion != fRecepcion){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = fRecepcion.toString();
      suplementoChange.contenidoNuevo = contratoInput.fechaRecepcion.toString();    
      suplementoChange.clausula = "Fecha de recepcion";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.fechaArribo != fArribo){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = fArribo.toString();
      suplementoChange.contenidoNuevo = contratoInput.fechaArribo.toString();    
      suplementoChange.clausula = "Fecha de arribo";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.financiamiento != financiamiento){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = financiamiento.toString();
      suplementoChange.contenidoNuevo = contratoInput.financiamiento.toString();    
      suplementoChange.clausula = "Financiamiento";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.tasaMoneda != tasaMoneda){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = tasaMoneda.toString();
      suplementoChange.contenidoNuevo = contratoInput.tasaMoneda.toString();    
      suplementoChange.clausula = "Tasa de la moneda";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.fechaTasa != fechaTasa){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = fechaTasa.toString();
      suplementoChange.contenidoNuevo = contratoInput.fechaTasa.toString();    
      suplementoChange.clausula = "Fecha de la tasa";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.fechaPFirma != fechaPFirma){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = fechaPFirma.toString();
      suplementoChange.contenidoNuevo = contratoInput.fechaPFirma.toString();    
      suplementoChange.clausula = "Fecha firma proveedor";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.pFin != pFin){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = pFin.toString();
      suplementoChange.contenidoNuevo = contratoInput.pFin.toString();    
      suplementoChange.clausula = "pFin";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.idNegociacion != idNegociacion){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = contratoInput.idNegociacion.toString();
      suplementoChange.contenidoNuevo = idNegociacion.toString();    
      suplementoChange.clausula = "Negociacion";
      this.suplementoChangeService.save(suplementoChange);
    }
    
    if(contratoInput.gastosLogisticos != gastosLogisticos){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = gastosLogisticos.toString();
      suplementoChange.contenidoNuevo = contratoInput.gastosLogisticos.toString();    
      suplementoChange.clausula = "Gastos logisticos";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.lugarFirma != lugarFirma){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = lugarFirma.toString();
      suplementoChange.contenidoNuevo = contratoInput.lugarFirma.toString();    
      suplementoChange.clausula = "Lugar de firma";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.idPais != idPais){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = idPais.toString();
      suplementoChange.contenidoNuevo = contratoInput.idPais.toString();    
      suplementoChange.clausula = "Pais";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contratoInput.idIncoterm != idIncoterm){
      suplementoChange.idEmbarque = null;
      suplementoChange.orden = null;
      suplementoChange.idCambio = 0;
      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
      suplementoChange.contenidoViejo = idIncoterm.toString();
      suplementoChange.contenidoNuevo = contratoInput.idIncoterm.toString();    
      suplementoChange.clausula = "Condicion de compra";
      this.suplementoChangeService.save(suplementoChange);
    }

    if(contrato.suplementoResumen.length == 1){
      let clausulas = contratoInput.contratoClausulas;
      for (let index = 0; index < clausulas.length; index++) {
        const clausula = clausulas[index];
        const clausulaVieja = contrato.contratoClausulas.find(clausula2=> clausula2.noClausula == clausula.noClausula)
        
        if(clausulaVieja.contenido != clausula.contenido){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = clausula.noClausula;
          suplementoChange.idCambio = 1;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = clausulaVieja.contenido.toString();
          suplementoChange.contenidoNuevo = clausula.contenido.toString();    
          suplementoChange.clausula = "Cambio en las clausulas";
          this.suplementoChangeService.save(suplementoChange); 
        }
        
      let embarques = contratoInput.embarques;
      for (let index = 0; index < embarques.length; index++) {
        const embarque = embarques[index];
        const embarqueViejo = contrato.embarques.find(clausula2=> clausula2.idEmbarque == embarque.idEmbarque)

        if(!embarqueViejo){
          let desgloses = embarque.contratoDesglose
          for(let index = 0; index < desgloses.length; index++){
            const desglose = desgloses[index];
            const codigo = await this.codigosParaLaVentaService.findOne(desglose.idCodigo);
            suplementoChange.idEmbarque = embarque.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 4;
            suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
            suplementoChange.contenidoViejo = "0";
            suplementoChange.contenidoNuevo = desglose.idCodigo.toString()+" "+codigo.descripcion;    
            suplementoChange.clausula = "Codigo añadido al contrato";
            this.suplementoChangeService.save(suplementoChange);
          }
        }

        if(embarqueViejo){
          if(embarqueViejo.fechaEntrega != embarque.fechaEntrega){
            suplementoChange.idEmbarque = embarque.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
            suplementoChange.contenidoViejo = embarqueViejo.fechaEntrega.toString();
            suplementoChange.contenidoNuevo = embarque.fechaEntrega.toString();    
            suplementoChange.clausula = "Fecha de entrega";
            this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.descuento != embarque.descuento){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.descuento.toString();
              suplementoChange.contenidoNuevo = embarque.descuento.toString();    
              suplementoChange.clausula = "Descuento";
              this.suplementoChangeService.save(suplementoChange);
            }
  
            if(embarqueViejo.terminado != embarque.terminado){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.terminado.toString();
              suplementoChange.contenidoNuevo = embarque.terminado.toString();    
              suplementoChange.clausula = "Terminado";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.cancelado != embarque.cancelado){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.cancelado.toString();
              suplementoChange.contenidoNuevo = embarque.cancelado.toString();    
              suplementoChange.clausula = "Cancelado";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.porFirmar != embarque.porFirmar){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.porFirmar.toString();
              suplementoChange.contenidoNuevo = embarque.porFirmar.toString();    
              suplementoChange.clausula = "Por firmar";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.qtyCnt != embarque.qtyCnt){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.qtyCnt.toString();
              suplementoChange.contenidoNuevo = embarque.qtyCnt.toString();    
              suplementoChange.clausula = "qtyCnt";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.flete != embarque.flete){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.flete.toString();
              suplementoChange.contenidoNuevo = embarque.flete.toString();    
              suplementoChange.clausula = "Flete";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.seguro != embarque.seguro){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.seguro.toString();
              suplementoChange.contenidoNuevo = embarque.seguro.toString();    
              suplementoChange.clausula = "Seguro";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.financiamiento != embarque.financiamiento){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.financiamiento.toString();
              suplementoChange.contenidoNuevo = embarque.financiamiento.toString();    
              suplementoChange.clausula = "Financiamiento";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.idEmpresaNaviera != embarque.idEmpresaNaviera){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.idEmpresaNaviera.toString();
              suplementoChange.contenidoNuevo = embarque.idEmpresaNaviera.toString();    
              suplementoChange.clausula = "Empresa Naviera";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.inspeccion != embarque.inspeccion){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.inspeccion.toString();
              suplementoChange.contenidoNuevo = embarque.inspeccion.toString();    
              suplementoChange.clausula = "Inspeccion";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.otros != embarque.otros){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.otros.toString();
              suplementoChange.contenidoNuevo = embarque.otros.toString();    
              suplementoChange.clausula = "Otros";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.c40 != embarque.c40){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.c40.toString();
              suplementoChange.contenidoNuevo = embarque.c40.toString();    
              suplementoChange.clausula = "c40";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.c20 != embarque.c20){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.c20.toString();
              suplementoChange.contenidoNuevo = embarque.c20.toString();    
              suplementoChange.clausula = "c20";
              this.suplementoChangeService.save(suplementoChange);
            }

            //Aqui se verifican suplementos PuertoEmbarque

            let desgloses = embarque.contratoDesglose;
            let desglosesViejos = embarqueViejo.contratoDesgloses;
            
            for(let index = 0; index < desgloses.length; index++){
              const desglose = desgloses[index];
              const desgloseViejo = desglosesViejos.find(desglose2=> desglose2.idCodigo == desglose.idCodigo)
              const codigo = await this.codigosParaLaVentaService.findOne(desglose.idCodigo);

              if(!desgloseViejo){
                suplementoChange.idEmbarque = embarque.idEmbarque;
                suplementoChange.orden = null;
                suplementoChange.idCambio = 4;
                suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                suplementoChange.contenidoViejo = "-";
                suplementoChange.contenidoNuevo = desglose.idCodigo.toString()+" "+codigo.descripcion;    
                suplementoChange.clausula = "Codigo añadido al contrato";
                this.suplementoChangeService.save(suplementoChange);
              }
          }
        }
      } 
    }
  }
    else if(contrato.suplementoResumen.length > 1){
      contrato.suplementoResumen.sort((a, b) => (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds())
        - (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds()));
      let suplementoAnterior = contrato.suplementoResumen[1];

      let clausulas = contratoInput.contratoClausulas;
      for (let index = 0; index < clausulas.length; index++) {
        const clausula = clausulas[index];
        const clausulaVieja = suplementoAnterior.suplementoClausulas.find(clausula2=> clausula2.noClausula == clausula.noClausula)
        
        if(clausulaVieja.txClausula != clausula.contenido){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = clausula.noClausula;
          suplementoChange.idCambio = 1;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = clausulaVieja.txClausula.toString();
          suplementoChange.contenidoNuevo = clausula.contenido.toString();    
          suplementoChange.clausula = "Cambio en las clausulas";
          this.suplementoChangeService.save(suplementoChange); 
        }     
      }

      let embarques = contratoInput.embarques;
      for (let index = 0; index < embarques.length; index++) {
        const embarque = embarques[index];
        const embarqueViejo = suplementoAnterior.suplementoEmbarques.find(clausula2=> clausula2.idEmbarque == embarque.idEmbarque)

        if(!embarqueViejo){
          let desgloses = embarque.contratoDesglose
          for(let index = 0; index < desgloses.length; index++){
            const desglose = desgloses[index];
            const codigo = await this.codigosParaLaVentaService.findOne(desglose.idCodigo);
            suplementoChange.idEmbarque = embarque.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 4;
            suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
            suplementoChange.contenidoViejo = "0";
            suplementoChange.contenidoNuevo = desglose.idCodigo.toString()+" "+codigo.descripcion;    
            suplementoChange.clausula = "Codigo añadido al contrato";
            this.suplementoChangeService.save(suplementoChange);
          }
        }

        if(embarqueViejo){
          if(embarqueViejo.fechaEntrega != embarque.fechaEntrega){
            suplementoChange.idEmbarque = embarque.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
            suplementoChange.contenidoViejo = embarqueViejo.fechaEntrega.toString();
            suplementoChange.contenidoNuevo = embarque.fechaEntrega.toString();    
            suplementoChange.clausula = "Fecha de entrega";
            this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.descuento != embarque.descuento){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.descuento.toString();
              suplementoChange.contenidoNuevo = embarque.descuento.toString();    
              suplementoChange.clausula = "Descuento";
              this.suplementoChangeService.save(suplementoChange);
            }
  
            if(embarqueViejo.terminado != embarque.terminado){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.terminado.toString();
              suplementoChange.contenidoNuevo = embarque.terminado.toString();    
              suplementoChange.clausula = "Terminado";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.cancelado != embarque.cancelado){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.cancelado.toString();
              suplementoChange.contenidoNuevo = embarque.cancelado.toString();    
              suplementoChange.clausula = "Cancelado";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.porFirmar != embarque.porFirmar){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.porFirmar.toString();
              suplementoChange.contenidoNuevo = embarque.porFirmar.toString();    
              suplementoChange.clausula = "Por firmar";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.qtyCnt != embarque.qtyCnt){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.qtyCnt.toString();
              suplementoChange.contenidoNuevo = embarque.qtyCnt.toString();    
              suplementoChange.clausula = "qtyCnt";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.flete != embarque.flete){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.flete.toString();
              suplementoChange.contenidoNuevo = embarque.flete.toString();    
              suplementoChange.clausula = "Flete";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.seguro != embarque.seguro){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.seguro.toString();
              suplementoChange.contenidoNuevo = embarque.seguro.toString();    
              suplementoChange.clausula = "Seguro";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.financiamiento != embarque.financiamiento){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.financiamiento.toString();
              suplementoChange.contenidoNuevo = embarque.financiamiento.toString();    
              suplementoChange.clausula = "Financiamiento";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.idEmpresaNaviera != embarque.idEmpresaNaviera){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.idEmpresaNaviera.toString();
              suplementoChange.contenidoNuevo = embarque.idEmpresaNaviera.toString();    
              suplementoChange.clausula = "Empresa Naviera";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.inspeccion != embarque.inspeccion){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.inspeccion.toString();
              suplementoChange.contenidoNuevo = embarque.inspeccion.toString();    
              suplementoChange.clausula = "Inspeccion";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.otros != embarque.otros){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.otros.toString();
              suplementoChange.contenidoNuevo = embarque.otros.toString();    
              suplementoChange.clausula = "Otros";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.c40 != embarque.c40){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.c40.toString();
              suplementoChange.contenidoNuevo = embarque.c40.toString();    
              suplementoChange.clausula = "c40";
              this.suplementoChangeService.save(suplementoChange);
            }
    
            if(embarqueViejo.c20 != embarque.c20){
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 3;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = embarqueViejo.c20.toString();
              suplementoChange.contenidoNuevo = embarque.c20.toString();    
              suplementoChange.clausula = "c20";
              this.suplementoChangeService.save(suplementoChange);
            }

            //Aqui se verifican suplementos PuertoEmbarque

            let desgloses = embarque.contratoDesglose
            let desglosesViejos = embarqueViejo.suplementoResumen.suplementoDesgloses.filter(embarque2=> embarque2.idEmbarque == embarqueViejo.idEmbarque);

            
            for(let index = 0; index < desgloses.length; index++){
              const desglose = desgloses[index];
              const desgloseViejo = desglosesViejos.find(desglose2=> desglose2.idCodigo == desglose.idCodigo)
              const codigo = await this.codigosParaLaVentaService.findOne(desglose.idCodigo);

              if(!desgloseViejo){
                suplementoChange.idEmbarque = embarque.idEmbarque;
                suplementoChange.orden = null;
                suplementoChange.idCambio = 4;
                suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                suplementoChange.contenidoViejo = "-";
                suplementoChange.contenidoNuevo = desglose.idCodigo.toString()+" "+codigo.descripcion;    
                suplementoChange.clausula = "Codigo añadido al contrato";
                this.suplementoChangeService.save(suplementoChange);
              }
          }
        }
      }
    }
    return true;
  }
  
  async save(usuarioToken: Usuarios,createContratoInput: CreateContratoInput) : Promise<Contratos> {
    return new Promise<Contratos>(async (resolve, reject) => {
      var esNuevo = true;
      var result: Contratos;
      if(createContratoInput.idContrato){
        esNuevo = false;
        var contratoViejo = await this.findOne(createContratoInput.idContrato);
        var negociacion = await this.negociacionResumenService.findOne(createContratoInput.idNegociacion);
  
        await this.contratoClausulaService.removeSeveralByContratoId(createContratoInput.idContrato);
        
        createContratoInput.modificado = true;
  
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

          let embarques = createContratoInput.embarques;
          for (let index = 0; index < embarques.length; index++) {
            const embarque = embarques[index];
            
            await this.contratoDesgloseService.removeSeveralByEmbarqueId(embarque.idEmbarque);
            var contratoEmbarque = new CreateEmbarqueInput();
            contratoEmbarque.idEmbarque = embarque.idEmbarque;
            contratoEmbarque.idContrato = embarque.idContrato;
            contratoEmbarque.idEjecutivo = embarque.idEjecutivo;
            contratoEmbarque.fechaEntrega = embarque.fechaEntrega;
            contratoEmbarque.numero = embarque.numero;
            contratoEmbarque.descuento = embarque.descuento;
            contratoEmbarque.terminado = embarque.terminado;
            contratoEmbarque.cancelado = embarque.cancelado;
            contratoEmbarque.porFirmar = embarque.porFirmar;
            contratoEmbarque.qtyCnt = embarque.qtyCnt;
            contratoEmbarque.flete = embarque.flete;
            contratoEmbarque.seguro = embarque.seguro;
            contratoEmbarque.financiamiento = embarque.financiamiento;
            contratoEmbarque.idEmpresaNaviera = embarque.idEmpresaNaviera;
            contratoEmbarque.inspeccion = embarque.inspeccion;
            contratoEmbarque.otros = embarque.otros;
            contratoEmbarque.c20 = embarque.c20;
            contratoEmbarque.c40 = embarque.c40;
            contratoEmbarque.actSci = embarque.actSci;
            
            await this.embarquesService.save(contratoEmbarque);

            this.puertoEmbarqueService.removeSeveralByEmbarqueId(embarque.idEmbarque);
            let puertoEmbarques = contratoEmbarque.puertoEmbarque;
            for(let index = 0; index < puertoEmbarques.length; index++){
              const puertoEmbarque = puertoEmbarques[index];
              var inputPuertoEmbarque = new CreatePuertoEmbarqueInput();
              inputPuertoEmbarque.idPuertoEmbarque = puertoEmbarque.idPuertoEmbarque;
              inputPuertoEmbarque.idEmbarque = puertoEmbarque.idEmbarque;
              inputPuertoEmbarque.idPuertoOrigen = puertoEmbarque.idPuertoOrigen;
              inputPuertoEmbarque.idPuertoDestino = puertoEmbarque.idPuertoDestino;
              this.puertoEmbarqueService.save(inputPuertoEmbarque);
            }
            
            let desgloses = contratoEmbarque.contratoDesglose;
            for (let index = 0; index < desgloses.length; index++) {
              const desglose = desgloses[index];
              var contratoDesglose = new CreateContratoDesgloseInput();
              contratoDesglose.idContratoDesglose = desglose.idContratoDesglose;
              contratoDesglose.idEmbarque = desglose.idEmbarque;
              contratoDesglose.idReferencia = desglose.idEmbarque;
              contratoDesglose.idCodigo = desglose.idCodigo;
              contratoDesglose.descripcionAx = desglose.descripcionAx;
              contratoDesglose.idUnidadMedida = desglose.idUnidadMedida;
              contratoDesglose.cantidadPorCarton = desglose.cantidadPorCarton;
              contratoDesglose.paquete = desglose.paquete;
              contratoDesglose.cantidadCartones = desglose.cantidadCartones;
              contratoDesglose.volumen = desglose.volumen;
              contratoDesglose.precio = desglose.precio;
              contratoDesglose.precioPaquete = desglose.precioPaquete;
              contratoDesglose.packing = desglose.packing;
              contratoDesglose.cajas = desglose.cajas;

              await this.contratoDesgloseService.save(contratoDesglose);
            }
          }
        }
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

        let embarques = createContratoInput.embarques;
        for (let index = 0; index < embarques.length; index++) {
          const embarque = embarques[index];
          
          var contratoEmbarque = new CreateEmbarqueInput();
          contratoEmbarque.idEmbarque = embarque.idEmbarque;
          contratoEmbarque.idContrato = embarque.idContrato;
          contratoEmbarque.idEjecutivo = embarque.idEjecutivo;
          contratoEmbarque.fechaEntrega = embarque.fechaEntrega;
          contratoEmbarque.numero = embarque.numero;
          contratoEmbarque.descuento = embarque.descuento;
          contratoEmbarque.terminado = embarque.terminado;
          contratoEmbarque.cancelado = embarque.cancelado;
          contratoEmbarque.porFirmar = embarque.porFirmar;
          contratoEmbarque.qtyCnt = embarque.qtyCnt;
          contratoEmbarque.flete = embarque.flete;
          contratoEmbarque.seguro = embarque.seguro;
          contratoEmbarque.financiamiento = embarque.financiamiento;
          contratoEmbarque.idEmpresaNaviera = embarque.idEmpresaNaviera;
          contratoEmbarque.inspeccion = embarque.inspeccion;
          contratoEmbarque.otros = embarque.otros;
          contratoEmbarque.c20 = embarque.c20;
          contratoEmbarque.c40 = embarque.c40;
          contratoEmbarque.actSci = embarque.actSci;
          
          await this.embarquesService.save(contratoEmbarque);

          let puertoEmbarques = contratoEmbarque.puertoEmbarque;
            for(let index = 0; index < puertoEmbarques.length; index++){
              const puertoEmbarque = puertoEmbarques[index];
              var inputPuertoEmbarque = new CreatePuertoEmbarqueInput();
              inputPuertoEmbarque.idPuertoEmbarque = puertoEmbarque.idPuertoEmbarque;
              inputPuertoEmbarque.idEmbarque = puertoEmbarque.idEmbarque;
              inputPuertoEmbarque.idPuertoOrigen = puertoEmbarque.idPuertoOrigen;
              inputPuertoEmbarque.idPuertoDestino = puertoEmbarque.idPuertoDestino;
              this.puertoEmbarqueService.save(inputPuertoEmbarque);
            }
          
          let desgloses = contratoEmbarque.contratoDesglose;
          for (let index = 0; index < desgloses.length; index++) {
            const desglose = desgloses[index];
            var contratoDesglose = new CreateContratoDesgloseInput();
            contratoDesglose.idContratoDesglose = desglose.idContratoDesglose;
            contratoDesglose.idEmbarque = desglose.idEmbarque;
            contratoDesglose.idReferencia = desglose.idEmbarque;
            contratoDesglose.idCodigo = desglose.idCodigo;
            contratoDesglose.descripcionAx = desglose.descripcionAx;
            contratoDesglose.idUnidadMedida = desglose.idUnidadMedida;
            contratoDesglose.cantidadPorCarton = desglose.cantidadPorCarton;
            contratoDesglose.paquete = desglose.paquete;
            contratoDesglose.cantidadCartones = desglose.cantidadCartones;
            contratoDesglose.volumen = desglose.volumen;
            contratoDesglose.precio = desglose.precio;
            contratoDesglose.precioPaquete = desglose.precioPaquete;
            contratoDesglose.packing = desglose.packing;
            contratoDesglose.cajas = desglose.cajas;

            await this.contratoDesgloseService.save(contratoDesglose);
          }
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
    return await this.contratoRepository.findOne(id,{relations:['contratoClausulas','documentacionContratos','embarques','facturaResumen','fichaCompraResumen',
    'suplementoEmbarques','suplementoResumen','suplementoClausulas']});
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
