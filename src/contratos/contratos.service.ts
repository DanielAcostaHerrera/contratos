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
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { PuertoEmbarque } from 'src/models/entities/PuertoEmbarque.entity';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { SuplementoChange } from 'src/models/entities/SuplementoChange.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { CreateSuplementoPuertoEmbarqueInput } from 'src/suplemento-puerto-embarque/dto/create-suplemento-puerto-embarque.input';
import { SuplementoPuertoEmbarqueService } from 'src/suplemento-puerto-embarque/suplemento-puerto-embarque.service';
import { CreateSuplementoPagoInput } from 'src/suplemento-pagos/dto/create-suplemento-pago.input';
import { PagosService } from 'src/pagos/pagos.service';
import { SuplementoPagosService } from 'src/suplemento-pagos/suplemento-pagos.service';
import { CreatePagoInput } from 'src/pagos/dto/create-pago.input';
import { Pagos } from 'src/models/entities/Pagos.entity';

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
  private puertoEmbarqueService: PuertoEmbarqueService, private suplementoPuertoEmbarqueService: SuplementoPuertoEmbarqueService,
  private suplementoPagosService: SuplementoPagosService, private pagosService: PagosService) {}


  async anadirSuplemento(usuarioToken: Usuarios, idContrato: number) : Promise<SuplementoResumen>{
      let contrato = await this.findOne(idContrato)
      var suplementoResumen = new CreateSuplementoResumanInput();
      let suplementoEmbarque = new CreateSuplementoEmbarqueInput();
      let suplementoDesglose = new CreateSuplementoDesgloseInput();
      let suplementoPuertoEmbarque = new CreateSuplementoPuertoEmbarqueInput();
      let suplementoPagos = new CreateSuplementoPagoInput();
      let resumenSuplemento: SuplementoResumen;
      
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
        resumenSuplemento = await this.suplementoResumenService.save(suplementoResumen);

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

          let puertoEmbarques = embarque.suplementoResumen.suplementoPuertoEmbarques.filter(embarque2=> embarque2.idEmbarque == embarque.idEmbarque);
          for (let index = 0; index < puertoEmbarques.length; index++) {
            const puertoEmbarque = puertoEmbarques[index];
            suplementoPuertoEmbarque.idSuplementoResumen = embarqueSuplemento.idSuplementoResumen;
            suplementoPuertoEmbarque.idEmbarque = embarque.idEmbarque;
            suplementoPuertoEmbarque.idPuertoOrigen = puertoEmbarque.idPuertoOrigen;
            suplementoPuertoEmbarque.idPuertoDestino = puertoEmbarque.idPuertoDestino;
            suplementoPuertoEmbarque.idPuertoEmbarque = puertoEmbarque.idPuertoEmbarque;
            

            await this.suplementoPuertoEmbarqueService.save(suplementoPuertoEmbarque);
          }

          let pagos = embarque.suplementoResumen.suplementoPagos.filter(embarque2=> embarque2.idEmbarque == embarque.idEmbarque);
          for (let index = 0; index < pagos.length; index++) {
            const pago = pagos[index];
            suplementoPagos.idSuplementoResumen = embarqueSuplemento.idSuplementoResumen;
            suplementoPagos.idEmbarque = embarque.idEmbarque;
            suplementoPagos.idFormaPago = pago.idFormaPago;
            suplementoPagos.plazoPago = pago.plazoPago;
            suplementoPagos.porciento = pago.porciento;
            suplementoPagos.aPartirDe = pago.aPartirDe;     
            suplementoPagos.idPago = pago.idPago; 

            await this.suplementoPagosService.save(suplementoPagos);
          }
          
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
        resumenSuplemento = await this.suplementoResumenService.save(suplementoResumen);

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

          let puertoEmbarques = embarque.puertoEmbarques;
          for (let index = 0; index < puertoEmbarques.length; index++) {
            const puertoEmbarque = puertoEmbarques[index];
            suplementoPuertoEmbarque.idSuplementoResumen = embarqueSuplemento.idSuplementoResumen;
            suplementoPuertoEmbarque.idEmbarque = embarque.idEmbarque;
            suplementoPuertoEmbarque.idPuertoOrigen = puertoEmbarque.idPuertoOrigen;
            suplementoPuertoEmbarque.idPuertoDestino = puertoEmbarque.idPuertoDestino;
            

            await this.suplementoPuertoEmbarqueService.save(suplementoPuertoEmbarque);
          }

          let pagos = embarque.pagos;
          for (let index = 0; index < pagos.length; index++) {
            const pago = pagos[index];
            suplementoPagos.idSuplementoResumen = embarqueSuplemento.idSuplementoResumen;
            suplementoPagos.idEmbarque = embarque.idEmbarque;
            suplementoPagos.idFormaPago = pago.idFormaPago;
            suplementoPagos.plazoPago = pago.plazoPago;
            suplementoPagos.porciento = pago.porciento;
            suplementoPagos.aPartirDe = pago.idPagosAPartirDe;
            

            await this.suplementoPagosService.save(suplementoPagos);
          }
          
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
      return resumenSuplemento;
  }

  async comprobarDiferencias(idContrato: number): Promise<SuplementoChange[]>{
    return new Promise<SuplementoChange[]>(async (resolve, reject) => {
      let contrato = await this.contratoRepository.findOne(idContrato);
      var suplementoChange = new CreateSuplementoChangeInput();

      if(!contrato.suplementoResumen){
        reject("El contrato seleccionado no tiene suplementos");
      }

      if(contrato.suplementoResumen.length == 1){
        let suplementoResumen = contrato.suplementoResumen[0];

        let idEjecutivo,firma,idMoneda,idEmpSeguro,idEmpNaviera,lugarEntrega,cancelado,notas,permitirEmbarquesParciales,cantidadEp,permitirEntregas,permitirTrasbordos,
        producto,noEntregasParciales,fInicial,fFinal,fFirma,fRecepcion,fArribo,financiamiento,tasaMoneda,fechaTasa,fechaPFirma,pFin,idNegociacion,gastosLogisticos,
        lugarFirma,idPais,idIncoterm;

        this.suplementoChangeService.removeSeveralBySuplementoResumenId(suplementoResumen.idSuplementoResumen);

          idEjecutivo = suplementoResumen.suplementadoPor;
          firma = suplementoResumen.firma;
          idMoneda = suplementoResumen.idMoneda;
          idEmpSeguro = suplementoResumen.idEmpSeguro;
          idEmpNaviera = suplementoResumen.idEmpNaviera;
          lugarEntrega = suplementoResumen.lugarEntrega;
          cancelado = suplementoResumen.cancelado;
          notas = suplementoResumen.notas;
          permitirEmbarquesParciales = suplementoResumen.permitirEmbarquesParciales;
          cantidadEp = suplementoResumen.cantidadEp;
          permitirEntregas = suplementoResumen.permitirEntregas;
          permitirTrasbordos = suplementoResumen.permitirTrasbordos;
          producto = suplementoResumen.producto;
          noEntregasParciales = suplementoResumen.noEntregasParciales;
          fInicial = suplementoResumen.fInicial;
          fFinal = suplementoResumen.fFinal;
          fFirma = suplementoResumen.fFirma;
          fRecepcion = suplementoResumen.fRecepcion;
          fArribo = suplementoResumen.fArribo;
          financiamiento = suplementoResumen.financiamiento;
          tasaMoneda = suplementoResumen.tasaMoneda;
          fechaTasa = suplementoResumen.fechaTasa;
          fechaPFirma = suplementoResumen.fechaPFirma;
          pFin = suplementoResumen.pFin;
          idNegociacion = suplementoResumen.idNegociacion;
          gastosLogisticos = suplementoResumen.gastosLogisticos;
          lugarFirma = suplementoResumen.lugarFirma;
          idPais = suplementoResumen.idPais;
          idIncoterm = suplementoResumen.idIncoterm;

        if(contrato.realizadoPor != idEjecutivo){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = idEjecutivo.toString();
          suplementoChange.contenidoNuevo = contrato.realizadoPor.toString();    
          suplementoChange.clausula = "Realizado por";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.firmadoPor != firma){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = firma.toString();
          suplementoChange.contenidoNuevo = contrato.firmadoPor.toString();    
          suplementoChange.clausula = "Firmado por";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.idMoneda != idMoneda){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = idMoneda.toString();
          suplementoChange.contenidoNuevo = contrato.idMoneda.toString();    
          suplementoChange.clausula = "Moneda usada";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.idEmpresaSeguro != idEmpSeguro){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = idEmpSeguro.toString();
          suplementoChange.contenidoNuevo = contrato.idEmpresaSeguro.toString();    
          suplementoChange.clausula = "Empresa de seguros";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.idEmpresaNaviera != idEmpNaviera){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = idEmpNaviera.toString();
          suplementoChange.contenidoNuevo = contrato.idEmpresaNaviera.toString();    
          suplementoChange.clausula = "Empresa naviera";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.lugarEntrega != lugarEntrega){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = lugarEntrega.toString();
          suplementoChange.contenidoNuevo = contrato.lugarEntrega.toString();    
          suplementoChange.clausula = "Lugar de Entrega";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.cancelado != cancelado){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = cancelado.toString();
          suplementoChange.contenidoNuevo = contrato.cancelado.toString();    
          suplementoChange.clausula = "Cancelado";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.notas != notas){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = notas.toString();
          suplementoChange.contenidoNuevo = contrato.notas.toString();    
          suplementoChange.clausula = "Notas";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.permitirEmbarquesParciales != permitirEmbarquesParciales){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = permitirEmbarquesParciales.toString();
          suplementoChange.contenidoNuevo = contrato.permitirEmbarquesParciales.toString();    
          suplementoChange.clausula = "Permitir embarques parciales";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.cantidadEp != cantidadEp){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = cantidadEp.toString();
          suplementoChange.contenidoNuevo = contrato.cantidadEp.toString();    
          suplementoChange.clausula = "Cantidad EP";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.permitirEntregas != permitirEntregas){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = permitirEntregas.toString();
          suplementoChange.contenidoNuevo = contrato.permitirEntregas.toString();    
          suplementoChange.clausula = "Permitir entregas";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.permitirTrasbordos != permitirTrasbordos){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = permitirTrasbordos.toString();
          suplementoChange.contenidoNuevo = contrato.permitirTrasbordos.toString();    
          suplementoChange.clausula = "Permitir trasbordos";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.producto != producto){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = producto.toString();
          suplementoChange.contenidoNuevo = contrato.producto.toString();    
          suplementoChange.clausula = "Producto";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.noEntregasParciales != noEntregasParciales){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = noEntregasParciales.toString();
          suplementoChange.contenidoNuevo = contrato.noEntregasParciales.toString();    
          suplementoChange.clausula = "Numero de entregas parciales";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.fechaInicial != fInicial){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = fInicial.toString();
          suplementoChange.contenidoNuevo = contrato.fechaInicial.toString();    
          suplementoChange.clausula = "Fecha Inicial";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.fechaFinal != fFinal){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = fFinal.toString();
          suplementoChange.contenidoNuevo = contrato.fechaFinal.toString();    
          suplementoChange.clausula = "Fecha Final";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.fechaFirma != fFirma){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = fFirma.toString();
          suplementoChange.contenidoNuevo = contrato.fechaFirma.toString();    
          suplementoChange.clausula = "Fecha de firma";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.fechaRecepcion != fRecepcion){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = fRecepcion.toString();
          suplementoChange.contenidoNuevo = contrato.fechaRecepcion.toString();    
          suplementoChange.clausula = "Fecha de recepcion";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.fechaArribo != fArribo){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = fArribo.toString();
          suplementoChange.contenidoNuevo = contrato.fechaArribo.toString();    
          suplementoChange.clausula = "Fecha de arribo";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.financiamiento != financiamiento){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = financiamiento.toString();
          suplementoChange.contenidoNuevo = contrato.financiamiento.toString();    
          suplementoChange.clausula = "Financiamiento";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.tasaMoneda != tasaMoneda){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = tasaMoneda.toString();
          suplementoChange.contenidoNuevo = contrato.tasaMoneda.toString();    
          suplementoChange.clausula = "Tasa de la moneda";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.fechaTasa != fechaTasa){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = fechaTasa.toString();
          suplementoChange.contenidoNuevo = contrato.fechaTasa.toString();    
          suplementoChange.clausula = "Fecha de la tasa";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.fechaPFirma != fechaPFirma){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = fechaPFirma.toString();
          suplementoChange.contenidoNuevo = contrato.fechaPFirma.toString();    
          suplementoChange.clausula = "Fecha firma proveedor";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.pFin != pFin){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = pFin.toString();
          suplementoChange.contenidoNuevo = contrato.pFin.toString();    
          suplementoChange.clausula = "pFin";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.idNegociacion != idNegociacion){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = contrato.idNegociacion.toString();
          suplementoChange.contenidoNuevo = idNegociacion.toString();    
          suplementoChange.clausula = "Negociacion";
          this.suplementoChangeService.save(suplementoChange);
        }
        
        if(contrato.gastosLogisticos != gastosLogisticos){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = gastosLogisticos.toString();
          suplementoChange.contenidoNuevo = contrato.gastosLogisticos.toString();    
          suplementoChange.clausula = "Gastos logisticos";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.lugarFirma != lugarFirma){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = lugarFirma.toString();
          suplementoChange.contenidoNuevo = contrato.lugarFirma.toString();    
          suplementoChange.clausula = "Lugar de firma";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.idPais != idPais){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = idPais.toString();
          suplementoChange.contenidoNuevo = contrato.idPais.toString();    
          suplementoChange.clausula = "Pais";
          this.suplementoChangeService.save(suplementoChange);
        }

        if(contrato.idIncoterm != idIncoterm){
          suplementoChange.idEmbarque = null;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 0;
          suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
          suplementoChange.contenidoViejo = idIncoterm.toString();
          suplementoChange.contenidoNuevo = contrato.idIncoterm.toString();    
          suplementoChange.clausula = "Condicion de compra";
          this.suplementoChangeService.save(suplementoChange);
        }

          let clausulas = contrato.contratoClausulas;
          for (let index = 0; index < clausulas.length; index++) {
            const clausula = clausulas[index];
            const clausulaVieja = suplementoResumen.suplementoClausulas.find(clausula2=> clausula2.noClausula == clausula.noClausula)
            
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

          let embarques = contrato.embarques;
          for (let index = 0; index < embarques.length; index++) {
            const embarque = embarques[index];
            const embarqueViejo = suplementoResumen.suplementoEmbarques.find(suplementoEmbarque=> suplementoEmbarque.idEmbarque == embarque.idEmbarque)

            if(!embarqueViejo){
              let desgloses = embarque.contratoDesgloses
              for(let index = 0; index < desgloses.length; index++){
                const desglose = desgloses[index];
                const codigo = await this.codigosParaLaVentaService.findOne(desglose.idCodigo);
                suplementoChange.idEmbarque = embarque.idEmbarque;
                suplementoChange.orden = null;
                suplementoChange.idCambio = 4;
                suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                suplementoChange.contenidoViejo = "-";
                suplementoChange.contenidoNuevo = "Codigo: "+desglose.idCodigo.toString()+" "+codigo.descripcion+" Referencia: "+desglose.referencia.referencia;    
                suplementoChange.clausula = "Codigo añadido al contrato";
                this.suplementoChangeService.save(suplementoChange);
              }

              let pagos  = embarque.pagos;

              for(let index = 0; index < pagos.length; index++){
                const pago = pagos[index];

                suplementoChange.idEmbarque = embarque.idEmbarque;
                suplementoChange.orden = null;
                suplementoChange.idCambio = 2;
                suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                suplementoChange.contenidoViejo = "-";
                suplementoChange.contenidoNuevo = "Forma de pago: "+pago.formaPago.formaPago.toString()," Pago a partir de: "+pago.pagoAPartirDe.aPartirDe.toString()+
                " Plazo pago: "+pago.plazoPago.toString()+" Porciento: "+pago.porciento.toString();    
                suplementoChange.clausula = "Añadido un nuevo pago";
                this.suplementoChangeService.save(suplementoChange);                 
              }

              let puertoEmbarques  = embarque.puertoEmbarques;

              for(let index = 0; index < puertoEmbarques.length; index++){
                const puertoEmbarque = puertoEmbarques[index];

                suplementoChange.idEmbarque = embarque.idEmbarque;
                suplementoChange.orden = null;
                suplementoChange.idCambio = 3;
                suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                suplementoChange.contenidoViejo = "-"
                suplementoChange.contenidoNuevo = puertoEmbarque.puertoDestino.nombre.toString();    
                suplementoChange.clausula = "Añadido nuevo puerto de destino";
                this.suplementoChangeService.save(suplementoChange);
                  
                suplementoChange.idEmbarque = embarque.idEmbarque;
                suplementoChange.orden = null;
                suplementoChange.idCambio = 3;
                suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                suplementoChange.contenidoViejo = "-"
                suplementoChange.contenidoNuevo = puertoEmbarque.puertoOrigen.nombre.toString();    
                suplementoChange.clausula = "Añadido nuevo puerto de origen";
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

                let desgloses = embarque.contratoDesgloses
                let desglosesViejos = embarqueViejo.suplementoResumen.suplementoDesgloses.filter(embarque2=> embarque2.idEmbarque == embarqueViejo.idEmbarque);

                for(let index = 0; index < desgloses.length; index++){
                  const desglose = desgloses[index];
                  const desgloseViejo = desglosesViejos.find(desglose2=> desglose2.idCodigo == desglose.idCodigo)
                  

                  if(!desgloseViejo){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 4;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = "-";
                    suplementoChange.contenidoNuevo = desglose.idCodigo.toString()+" "+desglose.codigo.descripcion.toString()+" Referencia: "+desglose.referencia.referencia;    
                    suplementoChange.clausula = "Codigo añadido al contrato";
                    this.suplementoChangeService.save(suplementoChange);
                  }

                  if(desgloseViejo){
                    if(desglose.idReferencia != desgloseViejo.idReferencia){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.referencia.referencia.toString();
                      suplementoChange.contenidoNuevo = desglose.referencia.referencia.toString();    
                      suplementoChange.clausula = "Referencia";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.idCodigo != desgloseViejo.idCodigo){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.idCodigo.toString()+" "+desgloseViejo.codigo.descripcion.toString();
                      suplementoChange.contenidoNuevo = desglose.idCodigo.toString()+" "+desglose.codigo.descripcion.toString();    
                      suplementoChange.clausula = "Codigo";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.descripcionAx != desgloseViejo.descripcionSp){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.descripcionSp.toString();
                      suplementoChange.contenidoNuevo = desglose.descripcionAx.toString();    
                      suplementoChange.clausula = "Descripcion";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.idUnidadMedida != desgloseViejo.idUnidadMedida){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.unidadMedida.nombre.toString();
                      suplementoChange.contenidoNuevo = desglose.unidadMedida.nombre.toString();    
                      suplementoChange.clausula = "Unidad de medida";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.cantidadCartones != desgloseViejo.cantidadCartones){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.cantidadCartones.toString();
                      suplementoChange.contenidoNuevo = desglose.cantidadCartones.toString();    
                      suplementoChange.clausula = "Cantidad de cartones";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.cantidadPorCarton != desgloseViejo.cantidadPorCarton){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.cantidadPorCarton.toString();
                      suplementoChange.contenidoNuevo = desglose.cantidadPorCarton.toString();    
                      suplementoChange.clausula = "Cantidad por carton";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.paquete != desgloseViejo.paquete){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.paquete.toString();
                      suplementoChange.contenidoNuevo = desglose.paquete.toString();    
                      suplementoChange.clausula = "Cantidad de paquetes";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.precioPaquete != desgloseViejo.precioPaquete){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.precioPaquete.toString();
                      suplementoChange.contenidoNuevo = desglose.precioPaquete.toString();    
                      suplementoChange.clausula = "Precio por paquete";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.volumen != desgloseViejo.volumen){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.volumen.toString();
                      suplementoChange.contenidoNuevo = desglose.volumen.toString();    
                      suplementoChange.clausula = "Volumen";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.precio != desgloseViejo.precio){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.precio.toString();
                      suplementoChange.contenidoNuevo = desglose.precio.toString();    
                      suplementoChange.clausula = "Precio";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.packing != desgloseViejo.packing){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.packing.toString();
                      suplementoChange.contenidoNuevo = desglose.packing.toString();    
                      suplementoChange.clausula = "Packing";
                      this.suplementoChangeService.save(suplementoChange);
                    }
                    if(desglose.cajas != desgloseViejo.cajas){
                      suplementoChange.idEmbarque = embarque.idEmbarque;
                      suplementoChange.orden = null;
                      suplementoChange.idCambio = 5;
                      suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                      suplementoChange.contenidoViejo = desgloseViejo.cajas.toString();
                      suplementoChange.contenidoNuevo = desglose.cajas.toString();    
                      suplementoChange.clausula = "Cajas";
                      this.suplementoChangeService.save(suplementoChange);
                    } 
                  }
                }

              let pagos  = embarque.pagos;
              let pagosViejos = embarqueViejo.suplementoResumen.suplementoPagos.filter(pago2=> pago2.idEmbarque == embarqueViejo.idEmbarque);

              for(let index = 0; index < pagos.length; index++){
                const pago = pagos[index];
                const pagoViejo = pagosViejos.find(pago2=> pago2.idPago == pago.idPago)

                if(!pagoViejo){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = "-";
                    suplementoChange.contenidoNuevo = "Forma de pago: "+pago.formaPago.formaPago.toString()," Pago a partir de: "+pago.pagoAPartirDe.aPartirDe.toString()+
                    " Plazo pago: "+pago.plazoPago.toString()+" Porciento: "+pago.porciento.toString();    
                    suplementoChange.clausula = "Añadido un nuevo pago";
                    this.suplementoChangeService.save(suplementoChange);               
                }

                if(pagoViejo){
                  if(pago.idFormaPago != pagoViejo.idFormaPago){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = pagoViejo.formasPago.formaPago.toString();
                    suplementoChange.contenidoNuevo = pago.formaPago.formaPago.toString();    
                    suplementoChange.clausula = "Forma de pago";
                    this.suplementoChangeService.save(suplementoChange);
                  }
  
                  if(pago.idPagosAPartirDe != pagoViejo.aPartirDe){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = pagoViejo.pagoAPartirDe.aPartirDe.toString();
                    suplementoChange.contenidoNuevo = pago.pagoAPartirDe.aPartirDe.toString();    
                    suplementoChange.clausula = "Pago a partir de";
                    this.suplementoChangeService.save(suplementoChange);
                  }
  
                  if(pago.plazoPago != pagoViejo.plazoPago){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = pagoViejo.plazoPago.toString();
                    suplementoChange.contenidoNuevo = pago.plazoPago.toString();    
                    suplementoChange.clausula = "Plazo pago";
                    this.suplementoChangeService.save(suplementoChange);
                  }
  
                  if(pago.porciento != pagoViejo.porciento){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = pagoViejo.porciento.toString();
                    suplementoChange.contenidoNuevo = pago.porciento.toString();    
                    suplementoChange.clausula = "Porciento";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                }
                
              }

              let puertoEmbarques  = embarque.puertoEmbarques;
              let puertoEmbarquesViejos = embarqueViejo.suplementoResumen.suplementoPuertoEmbarques.filter(embarque2=> embarque2.idEmbarque == embarqueViejo.idEmbarque);

              for(let index = 0; index < puertoEmbarques.length; index++){
                const puertoEmbarque = puertoEmbarques[index];
                const puertoEmbarqueViejo = puertoEmbarquesViejos.find(puertoEmbarque2=> puertoEmbarque2.idPuertoEmbarque == puertoEmbarque.idPuertoEmbarque)

                if(!puertoEmbarqueViejo){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 3;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = "-"
                    suplementoChange.contenidoNuevo = puertoEmbarque.puertoDestino.nombre.toString();    
                    suplementoChange.clausula = "Añadido nuevo puerto de destino";
                    this.suplementoChangeService.save(suplementoChange);
                  
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 3;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = "-"
                    suplementoChange.contenidoNuevo = puertoEmbarque.puertoOrigen.nombre.toString();    
                    suplementoChange.clausula = "Añadido nuevo puerto de origen";
                    this.suplementoChangeService.save(suplementoChange);              
                }
                
                if(puertoEmbarqueViejo){
                  if(puertoEmbarque.idPuertoDestino != puertoEmbarqueViejo.idPuertoDestino){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 3;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = puertoEmbarqueViejo.puertoDestino.nombre.toString();
                    suplementoChange.contenidoNuevo = puertoEmbarque.puertoDestino.nombre.toString();    
                    suplementoChange.clausula = "Cambiado puerto de destino";
                    this.suplementoChangeService.save(suplementoChange);
                  }
  
                  if(puertoEmbarque.idPuertoOrigen != puertoEmbarqueViejo.idPuertoOrigen){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 3;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = puertoEmbarqueViejo.puertoOrigen.nombre.toString();
                    suplementoChange.contenidoNuevo = puertoEmbarque.puertoOrigen.nombre.toString();    
                    suplementoChange.clausula = "Cambiado puerto de origen";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                }
              }
            }
          }
          let changesTemp = await this.suplementoChangeService.findAll();
          let result = changesTemp.filter(change=> change.idSuplementoResumen == suplementoResumen.idSuplementoResumen)

          resolve(result); 
      }

      if(contrato.suplementoResumen.length > 1){
        contrato.suplementoResumen.sort((a, b) => (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds())
      - (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds()));
      let suplementoResumen = contrato.suplementoResumen[0];
      let suplementoAnterior = contrato.suplementoResumen[1];

      let idEjecutivo,firma,idMoneda,idEmpSeguro,idEmpNaviera,lugarEntrega,cancelado,notas,permitirEmbarquesParciales,cantidadEp,permitirEntregas,permitirTrasbordos,
      producto,noEntregasParciales,fInicial,fFinal,fFirma,fRecepcion,fArribo,financiamiento,tasaMoneda,fechaTasa,fechaPFirma,pFin,idNegociacion,gastosLogisticos,
      lugarFirma,idPais,idIncoterm;

      this.suplementoChangeService.removeSeveralBySuplementoResumenId(suplementoResumen.idSuplementoResumen);

        idEjecutivo = suplementoResumen.suplementadoPor;
        firma = suplementoResumen.firma;
        idMoneda = suplementoResumen.idMoneda;
        idEmpSeguro = suplementoResumen.idEmpSeguro;
        idEmpNaviera = suplementoResumen.idEmpNaviera;
        lugarEntrega = suplementoResumen.lugarEntrega;
        cancelado = suplementoResumen.cancelado;
        notas = suplementoResumen.notas;
        permitirEmbarquesParciales = suplementoResumen.permitirEmbarquesParciales;
        cantidadEp = suplementoResumen.cantidadEp;
        permitirEntregas = suplementoResumen.permitirEntregas;
        permitirTrasbordos = suplementoResumen.permitirTrasbordos;
        producto = suplementoResumen.producto;
        noEntregasParciales = suplementoResumen.noEntregasParciales;
        fInicial = suplementoResumen.fInicial;
        fFinal = suplementoResumen.fFinal;
        fFirma = suplementoResumen.fFirma;
        fRecepcion = suplementoResumen.fRecepcion;
        fArribo = suplementoResumen.fArribo;
        financiamiento = suplementoResumen.financiamiento;
        tasaMoneda = suplementoResumen.tasaMoneda;
        fechaTasa = suplementoResumen.fechaTasa;
        fechaPFirma = suplementoResumen.fechaPFirma;
        pFin = suplementoResumen.pFin;
        idNegociacion = suplementoResumen.idNegociacion;
        gastosLogisticos = suplementoResumen.gastosLogisticos;
        lugarFirma = suplementoResumen.lugarFirma;
        idPais = suplementoResumen.idPais;
        idIncoterm = suplementoResumen.idIncoterm;

      if(suplementoAnterior.suplementadoPor != idEjecutivo){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = idEjecutivo.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.suplementadoPor.toString();    
        suplementoChange.clausula = "Realizado por";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.firma != firma){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = firma.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.firma.toString();    
        suplementoChange.clausula = "Firmado por";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.idMoneda != idMoneda){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = idMoneda.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.idMoneda.toString();    
        suplementoChange.clausula = "Moneda usada";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.idEmpSeguro != idEmpSeguro){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = idEmpSeguro.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.idEmpSeguro.toString();    
        suplementoChange.clausula = "Empresa de seguros";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.idEmpNaviera != idEmpNaviera){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = idEmpNaviera.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.idEmpNaviera.toString();    
        suplementoChange.clausula = "Empresa naviera";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.lugarEntrega != lugarEntrega){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = lugarEntrega.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.lugarEntrega.toString();    
        suplementoChange.clausula = "Lugar de Entrega";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.cancelado != cancelado){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = cancelado.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.cancelado.toString();    
        suplementoChange.clausula = "Cancelado";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.notas != notas){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = notas.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.notas.toString();    
        suplementoChange.clausula = "Notas";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.permitirEmbarquesParciales != permitirEmbarquesParciales){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = permitirEmbarquesParciales.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.permitirEmbarquesParciales.toString();    
        suplementoChange.clausula = "Permitir embarques parciales";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.cantidadEp != cantidadEp){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = cantidadEp.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.cantidadEp.toString();    
        suplementoChange.clausula = "Cantidad EP";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.permitirEntregas != permitirEntregas){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = permitirEntregas.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.permitirEntregas.toString();    
        suplementoChange.clausula = "Permitir entregas";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.permitirTrasbordos != permitirTrasbordos){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = permitirTrasbordos.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.permitirTrasbordos.toString();    
        suplementoChange.clausula = "Permitir trasbordos";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.producto != producto){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = producto.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.producto.toString();    
        suplementoChange.clausula = "Producto";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.noEntregasParciales != noEntregasParciales){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = noEntregasParciales.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.noEntregasParciales.toString();    
        suplementoChange.clausula = "Numero de entregas parciales";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.fInicial != fInicial){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = fInicial.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.fInicial.toString();    
        suplementoChange.clausula = "Fecha Inicial";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.fFinal != fFinal){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = fFinal.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.fFinal.toString();    
        suplementoChange.clausula = "Fecha Final";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.fFirma != fFirma){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = fFirma.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.fFirma.toString();    
        suplementoChange.clausula = "Fecha de firma";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.fRecepcion != fRecepcion){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = fRecepcion.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.fRecepcion.toString();    
        suplementoChange.clausula = "Fecha de recepcion";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.fArribo != fArribo){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = fArribo.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.fArribo.toString();    
        suplementoChange.clausula = "Fecha de arribo";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.financiamiento != financiamiento){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = financiamiento.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.financiamiento.toString();    
        suplementoChange.clausula = "Financiamiento";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.tasaMoneda != tasaMoneda){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = tasaMoneda.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.tasaMoneda.toString();    
        suplementoChange.clausula = "Tasa de la moneda";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.fechaTasa != fechaTasa){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = fechaTasa.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.fechaTasa.toString();    
        suplementoChange.clausula = "Fecha de la tasa";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.fechaPFirma != fechaPFirma){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = fechaPFirma.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.fechaPFirma.toString();    
        suplementoChange.clausula = "Fecha firma proveedor";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.pFin != pFin){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = pFin.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.pFin.toString();    
        suplementoChange.clausula = "pFin";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.idNegociacion != idNegociacion){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = contrato.idNegociacion.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.toString();    
        suplementoChange.clausula = "Negociacion";
        this.suplementoChangeService.save(suplementoChange);
      }
      
      if(suplementoAnterior.gastosLogisticos != gastosLogisticos){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = gastosLogisticos.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.gastosLogisticos.toString();    
        suplementoChange.clausula = "Gastos logisticos";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.lugarFirma != lugarFirma){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = lugarFirma.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.lugarFirma.toString();    
        suplementoChange.clausula = "Lugar de firma";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.idPais != idPais){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = idPais.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.idPais.toString();    
        suplementoChange.clausula = "Pais";
        this.suplementoChangeService.save(suplementoChange);
      }

      if(suplementoAnterior.idIncoterm != idIncoterm){
        suplementoChange.idEmbarque = null;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 0;
        suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
        suplementoChange.contenidoViejo = idIncoterm.toString();
        suplementoChange.contenidoNuevo = suplementoAnterior.idIncoterm.toString();    
        suplementoChange.clausula = "Condicion de compra";
        this.suplementoChangeService.save(suplementoChange);
      }

        let clausulas = suplementoAnterior.suplementoClausulas;
        for (let index = 0; index < clausulas.length; index++) {
          const clausula = clausulas[index];
          const clausulaVieja = suplementoResumen.suplementoClausulas.find(clausula2=> clausula2.noClausula == clausula.noClausula)
          
          if(clausulaVieja.txClausula != clausula.txClausula){
            suplementoChange.idEmbarque = null;
            suplementoChange.orden = clausula.noClausula;
            suplementoChange.idCambio = 1;
            suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
            suplementoChange.contenidoViejo = clausulaVieja.txClausula.toString();
            suplementoChange.contenidoNuevo = clausula.txClausula.toString();    
            suplementoChange.clausula = "Cambio en las clausulas";
            this.suplementoChangeService.save(suplementoChange); 
          }     
        }

        let embarques = suplementoAnterior.suplementoEmbarques.filter(suplementoEmbarque=> suplementoEmbarque.idSuplementoResumen == suplementoAnterior.idSuplementoResumen);
        for (let index = 0; index < embarques.length; index++) {
          const embarque = embarques[index];
          const embarqueViejo = suplementoResumen.suplementoEmbarques.find(suplementoEmbarque=> suplementoEmbarque.idEmbarque == embarque.idEmbarque)

          if(!embarqueViejo){
            let desgloses = embarque.suplementoResumen.suplementoDesgloses.filter(suplementoEmbarque=> suplementoEmbarque.idEmbarque == embarque.idEmbarque)
            for(let index = 0; index < desgloses.length; index++){
              const desglose = desgloses[index];
              const codigo = await this.codigosParaLaVentaService.findOne(desglose.idCodigo);
              suplementoChange.idEmbarque = embarque.idEmbarque;
              suplementoChange.orden = null;
              suplementoChange.idCambio = 4;
              suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
              suplementoChange.contenidoViejo = "-";
              suplementoChange.contenidoNuevo = desglose.idCodigo.toString()+" "+codigo.descripcion+" Referencia: "+desglose.referencia.referencia; ;    
              suplementoChange.clausula = "Codigo añadido al contrato";
              this.suplementoChangeService.save(suplementoChange);
            }

            let pagos  = embarque.suplementoResumen.suplementoPagos.filter(pago2=> pago2.idEmbarque == embarque.idEmbarque);

              for(let index = 0; index < pagos.length; index++){
                const pago = pagos[index];

                suplementoChange.idEmbarque = embarque.idEmbarque;
                suplementoChange.orden = null;
                suplementoChange.idCambio = 2;
                suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                suplementoChange.contenidoViejo = "-";
                suplementoChange.contenidoNuevo = "Forma de pago: "+pago.formasPago.formaPago.toString()," Pago a partir de: "+pago.pagoAPartirDe.aPartirDe.toString()+
                " Plazo pago: "+pago.plazoPago.toString()+" Porciento: "+pago.porciento.toString();    
                suplementoChange.clausula = "Añadido un nuevo pago";
                this.suplementoChangeService.save(suplementoChange);                 
              }

              let puertoEmbarques  = embarque.suplementoResumen.suplementoPuertoEmbarques.filter(pago2=> pago2.idEmbarque == embarque.idEmbarque);

              for(let index = 0; index < puertoEmbarques.length; index++){
                const puertoEmbarque = puertoEmbarques[index];

                suplementoChange.idEmbarque = embarque.idEmbarque;
                suplementoChange.orden = null;
                suplementoChange.idCambio = 3;
                suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                suplementoChange.contenidoViejo = "-"
                suplementoChange.contenidoNuevo = puertoEmbarque.puertoDestino.nombre.toString();    
                suplementoChange.clausula = "Añadido nuevo puerto de destino";
                this.suplementoChangeService.save(suplementoChange);
                  
                suplementoChange.idEmbarque = embarque.idEmbarque;
                suplementoChange.orden = null;
                suplementoChange.idCambio = 3;
                suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                suplementoChange.contenidoViejo = "-"
                suplementoChange.contenidoNuevo = puertoEmbarque.puertoOrigen.nombre.toString();    
                suplementoChange.clausula = "Añadido nuevo puerto de origen";
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

              let desgloses = embarque.suplementoResumen.suplementoDesgloses.filter(suplementoEmbarque=> suplementoEmbarque.idEmbarque == embarque.idEmbarque);
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
                  suplementoChange.contenidoNuevo = desglose.idCodigo.toString()+" "+codigo.descripcion+" Referencia: "+desglose.referencia.referencia; ;    
                  suplementoChange.clausula = "Codigo añadido al contrato";
                  this.suplementoChangeService.save(suplementoChange);
                }

                if(desgloseViejo){
                  if(desglose.idReferencia != desgloseViejo.idReferencia){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.referencia.referencia.toString();
                    suplementoChange.contenidoNuevo = desglose.referencia.referencia.toString();    
                    suplementoChange.clausula = "Referencia";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.idCodigo != desgloseViejo.idCodigo){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.idCodigo.toString()+" "+desgloseViejo.codigo.descripcion.toString();
                    suplementoChange.contenidoNuevo = desglose.idCodigo.toString()+" "+desglose.codigo.descripcion.toString();    
                    suplementoChange.clausula = "Codigo";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.descripcionSp != desgloseViejo.descripcionSp){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.descripcionSp.toString();
                    suplementoChange.contenidoNuevo = desglose.descripcionSp.toString();    
                    suplementoChange.clausula = "Descripcion";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.idUnidadMedida != desgloseViejo.idUnidadMedida){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.unidadMedida.nombre.toString();
                    suplementoChange.contenidoNuevo = desglose.unidadMedida.nombre.toString();    
                    suplementoChange.clausula = "Unidad de medida";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.cantidadCartones != desgloseViejo.cantidadCartones){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.cantidadCartones.toString();
                    suplementoChange.contenidoNuevo = desglose.cantidadCartones.toString();    
                    suplementoChange.clausula = "Cantidad de cartones";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.cantidadPorCarton != desgloseViejo.cantidadPorCarton){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.cantidadPorCarton.toString();
                    suplementoChange.contenidoNuevo = desglose.cantidadPorCarton.toString();    
                    suplementoChange.clausula = "Cantidad por carton";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.paquete != desgloseViejo.paquete){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.paquete.toString();
                    suplementoChange.contenidoNuevo = desglose.paquete.toString();    
                    suplementoChange.clausula = "Cantidad de paquetes";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.precioPaquete != desgloseViejo.precioPaquete){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.precioPaquete.toString();
                    suplementoChange.contenidoNuevo = desglose.precioPaquete.toString();    
                    suplementoChange.clausula = "Precio por paquete";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.volumen != desgloseViejo.volumen){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.volumen.toString();
                    suplementoChange.contenidoNuevo = desglose.volumen.toString();    
                    suplementoChange.clausula = "Volumen";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.precio != desgloseViejo.precio){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.precio.toString();
                    suplementoChange.contenidoNuevo = desglose.precio.toString();    
                    suplementoChange.clausula = "Precio";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.packing != desgloseViejo.packing){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.packing.toString();
                    suplementoChange.contenidoNuevo = desglose.packing.toString();    
                    suplementoChange.clausula = "Packing";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                  if(desglose.cajas != desgloseViejo.cajas){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 5;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = desgloseViejo.cajas.toString();
                    suplementoChange.contenidoNuevo = desglose.cajas.toString();    
                    suplementoChange.clausula = "Cajas";
                    this.suplementoChangeService.save(suplementoChange);
                  } 
                }
            }

            let pagos  = embarque.suplementoResumen.suplementoPagos.filter(pago2=> pago2.idEmbarque == embarque.idEmbarque);
            let pagosViejos = embarqueViejo.suplementoResumen.suplementoPagos.filter(pago2=> pago2.idEmbarque == embarqueViejo.idEmbarque);

              for(let index = 0; index < pagos.length; index++){
                const pago = pagos[index];
                const pagoViejo = pagosViejos.find(pago2=> pago2.idPago == pago.idPago)

                if(!pagoViejo){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = "-";
                    suplementoChange.contenidoNuevo = "Forma de pago: "+pago.formasPago.formaPago.toString()," Pago a partir de: "+pago.pagoAPartirDe.aPartirDe.toString()+
                    " Plazo pago: "+pago.plazoPago.toString()+" Porciento: "+pago.porciento.toString();    
                    suplementoChange.clausula = "Añadido un nuevo pago";
                    this.suplementoChangeService.save(suplementoChange);               
                }

                if(pagoViejo){
                  if(pago.idFormaPago != pagoViejo.idFormaPago){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = pagoViejo.formasPago.formaPago.toString();
                    suplementoChange.contenidoNuevo = pago.formasPago.formaPago.toString();    
                    suplementoChange.clausula = "Forma de pago";
                    this.suplementoChangeService.save(suplementoChange);
                  }
  
                  if(pago.aPartirDe != pagoViejo.aPartirDe){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = pagoViejo.pagoAPartirDe.aPartirDe.toString();
                    suplementoChange.contenidoNuevo = pago.pagoAPartirDe.aPartirDe.toString();    
                    suplementoChange.clausula = "Pago a partir de";
                    this.suplementoChangeService.save(suplementoChange);
                  }
  
                  if(pago.plazoPago != pagoViejo.plazoPago){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = pagoViejo.plazoPago.toString();
                    suplementoChange.contenidoNuevo = pago.plazoPago.toString();    
                    suplementoChange.clausula = "Plazo pago";
                    this.suplementoChangeService.save(suplementoChange);
                  }
  
                  if(pago.porciento != pagoViejo.porciento){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 2;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = pagoViejo.porciento.toString();
                    suplementoChange.contenidoNuevo = pago.porciento.toString();    
                    suplementoChange.clausula = "Porciento";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                }
                
              }

              let puertoEmbarques  = embarque.suplementoResumen.suplementoPuertoEmbarques.filter(embarque2=> embarque2.idEmbarque == embarque.idEmbarque);;
              let puertoEmbarquesViejos = embarqueViejo.suplementoResumen.suplementoPuertoEmbarques.filter(embarque2=> embarque2.idEmbarque == embarqueViejo.idEmbarque);

              for(let index = 0; index < puertoEmbarques.length; index++){
                const puertoEmbarque = puertoEmbarques[index];
                const puertoEmbarqueViejo = puertoEmbarquesViejos.find(puertoEmbarque2=> puertoEmbarque2.idPuertoEmbarque == puertoEmbarque.idPuertoEmbarque)

                if(!puertoEmbarqueViejo){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 3;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = "-"
                    suplementoChange.contenidoNuevo = puertoEmbarque.puertoDestino.nombre.toString();    
                    suplementoChange.clausula = "Añadido nuevo puerto de destino";
                    this.suplementoChangeService.save(suplementoChange);
                  
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 3;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = "-"
                    suplementoChange.contenidoNuevo = puertoEmbarque.puertoOrigen.nombre.toString();    
                    suplementoChange.clausula = "Añadido nuevo puerto de origen";
                    this.suplementoChangeService.save(suplementoChange);              
                }
                
                if(puertoEmbarqueViejo){
                  if(puertoEmbarque.idPuertoDestino != puertoEmbarqueViejo.idPuertoDestino){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 3;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = puertoEmbarqueViejo.puertoDestino.nombre.toString();
                    suplementoChange.contenidoNuevo = puertoEmbarque.puertoDestino.nombre.toString();    
                    suplementoChange.clausula = "Cambiado puerto de destino";
                    this.suplementoChangeService.save(suplementoChange);
                  }
  
                  if(puertoEmbarque.idPuertoOrigen != puertoEmbarqueViejo.idPuertoOrigen){
                    suplementoChange.idEmbarque = embarque.idEmbarque;
                    suplementoChange.orden = null;
                    suplementoChange.idCambio = 3;
                    suplementoChange.idSuplementoResumen = suplementoResumen.idSuplementoResumen;
                    suplementoChange.contenidoViejo = puertoEmbarqueViejo.puertoOrigen.nombre.toString();
                    suplementoChange.contenidoNuevo = puertoEmbarque.puertoOrigen.nombre.toString();    
                    suplementoChange.clausula = "Cambiado puerto de origen";
                    this.suplementoChangeService.save(suplementoChange);
                  }
                }
              }
          }
        }
        let changesTemp = await this.suplementoChangeService.findAll();
        let result = changesTemp.filter(change=> change.idSuplementoResumen == suplementoResumen.idSuplementoResumen)

        resolve(result); 
    }
    });
  }
  
  async save(usuarioToken: Usuarios,createContratoInput: CreateContratoInput) : Promise<Contratos> {
    return new Promise<Contratos>(async (resolve, reject) => {
      var esNuevo = true;
      var result: Contratos;
      var suplementoResumen = new CreateSuplementoResumanInput();
      if(createContratoInput.idContrato){
        esNuevo = false;
        var contratoViejo = await this.findOne(createContratoInput.idContrato);
        var negociacion = await this.negociacionResumenService.findOne(createContratoInput.idNegociacion);

        if(!contratoViejo.suplementoResumen){
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
              await this.puertoEmbarqueService.removeSeveralByEmbarqueId(embarque.idEmbarque);
              
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

              
              let puertoEmbarques = createContratoInput.embarques[index].puertoEmbarque;
              for(let index = 0; index < puertoEmbarques.length; index++){
                const puertoEmbarque = puertoEmbarques[index];
                var inputPuertoEmbarque = new CreatePuertoEmbarqueInput();
                inputPuertoEmbarque.idPuertoEmbarque = puertoEmbarque.idPuertoEmbarque;
                inputPuertoEmbarque.idEmbarque = puertoEmbarque.idEmbarque;
                inputPuertoEmbarque.idPuertoOrigen = puertoEmbarque.idPuertoOrigen;
                inputPuertoEmbarque.idPuertoDestino = puertoEmbarque.idPuertoDestino;
                await this.puertoEmbarqueService.save(inputPuertoEmbarque);
              }

              let pagos = createContratoInput.embarques[index].pagos;
              for(let index = 0; index < pagos.length; index++){
                const pago = pagos[index];
                var inputPago = new CreatePagoInput();
                inputPago.idEmbarque = pago.idEmbarque;
                inputPago.idFormaPago = pago.idFormaPago;
                inputPago.idPagosAPartirDe = pago.idPagosAPartirDe;
                inputPago.plazoPago = pago.plazoPago;
                inputPago.porciento = pago.porciento;
                inputPago.idPago = pago.idPago;
                await this.pagosService.save(inputPago);
              }
              
              let desgloses = createContratoInput.embarques[index].contratoDesglose;
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

        if(contratoViejo.suplementoResumen){
          contratoViejo.suplementoResumen.sort((a, b) => (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds())
        - (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds()));
         let ultimoSuplemento = contratoViejo.suplementoResumen[0];

         await this.suplementoClausulasService.removeSeveralByContratoIdSuplementoResumenId(createContratoInput.idContrato, ultimoSuplemento.idSuplementoResumen);

          suplementoResumen.idSuplementoResumen = ultimoSuplemento.idSuplementoResumen;
          suplementoResumen.idContrato = ultimoSuplemento.idContrato;
          suplementoResumen.suplementadoPor = usuarioToken.idEjecutivo;
          suplementoResumen.fecha = new Date();
          suplementoResumen.operacion = negociacion.operacion;
          suplementoResumen.modificado = true;
          suplementoResumen.terminadoS = false;
          suplementoResumen.idEjecutivo = createContratoInput.firmadoPor;
          suplementoResumen.firma = createContratoInput.firmadoPor;
          suplementoResumen.idMoneda = createContratoInput.idMoneda;
          suplementoResumen.idEmpSeguro = createContratoInput.idEmpresaSeguro;
          suplementoResumen.idEmpNaviera = createContratoInput.idEmpresaNaviera;
          suplementoResumen.lugarEntrega = createContratoInput.lugarEntrega;
          suplementoResumen.cancelado = createContratoInput.cancelado;
          suplementoResumen.notas = createContratoInput.notas;
          suplementoResumen.permitirEmbarquesParciales = createContratoInput.permitirEmbarquesParciales;
          suplementoResumen.cantidadEp = createContratoInput.cantidadEp;
          suplementoResumen.permitirEntregas = createContratoInput.permitirEntregas;
          suplementoResumen.permitirTrasbordos = createContratoInput.permitirTrasbordos;
          suplementoResumen.producto = createContratoInput.producto;
          suplementoResumen.noEntregasParciales = createContratoInput.noEntregasParciales;
          suplementoResumen.fInicial = createContratoInput.fechaInicial;
          suplementoResumen.fFinal = createContratoInput.fechaFinal;
          suplementoResumen.fFirma = createContratoInput.fechaFirma;
          suplementoResumen.fRecepcion = createContratoInput.fechaRecepcion;
          suplementoResumen.fArribo = createContratoInput.fechaArribo;
          suplementoResumen.financiamiento = createContratoInput.financiamiento;
          suplementoResumen.tasaMoneda = createContratoInput.tasaMoneda;
          suplementoResumen.fechaTasa = createContratoInput.fechaTasa;
          suplementoResumen.fechaPFirma = createContratoInput.fechaPFirma;
          suplementoResumen.pFin = createContratoInput.pFin;
          suplementoResumen.idNegociacion = createContratoInput.idNegociacion;
          suplementoResumen.gastosLogisticos = createContratoInput.gastosLogisticos;
          suplementoResumen.lugarFirma = createContratoInput.lugarFirma;
          suplementoResumen.idPais = createContratoInput.idPais;
          suplementoResumen.idIncoterm = createContratoInput.idIncoterm;
          suplementoResumen.origen = ultimoSuplemento.origen;
    
          let result2 = await this.suplementoResumenService.save(suplementoResumen);
    
          if(result2){
            let clausulas = createContratoInput.contratoClausulas;
            for (let index = 0; index < clausulas.length; index++) {
              const clausula = clausulas[index];
              
              var suplementoClausula = new CreateSuplementoClausulaInput();
              suplementoClausula.idSuplementoResumen = result2.idSuplementoResumen;
              suplementoClausula.idContrato = clausula.idContrato;
              suplementoClausula.txClausula = clausula.contenido;
              suplementoClausula.noClausula = clausula.noClausula;
              suplementoClausula.modificada = false; 
              
              await this.suplementoClausulasService.save(suplementoClausula)        
            }

            let embarques = createContratoInput.embarques;
            for (let index = 0; index < embarques.length; index++) {
              const embarque = embarques[index];
              
              await this.suplementoDesgloseService.removeSeveralByEmbarqueIdSuplementoResumenId(embarque.idEmbarque, suplementoResumen.idSuplementoResumen);
              await this.suplementoPuertoEmbarqueService.removeSeveralByEmbarqueIdSuplementoResumenId(embarque.idEmbarque,suplementoResumen.idSuplementoResumen);
              await this.suplementoPagosService.removeSeveralByEmbarqueIdSuplementoResumenId(embarque.idEmbarque,suplementoResumen.idSuplementoResumen);

              var suplementoEmbarque = new CreateSuplementoEmbarqueInput();
              suplementoEmbarque.idSuplementoResumen = result2.idSuplementoResumen;
              suplementoEmbarque.idEmbarque = embarque.idEmbarque;
              suplementoEmbarque.idContrato = embarque.idContrato;
              suplementoEmbarque.fechaEntrega = embarque.fechaEntrega;
              suplementoEmbarque.numero = embarque.numero;
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
              suplementoEmbarque.c20 = embarque.c20;
              suplementoEmbarque.c40 = embarque.c40;
              suplementoEmbarque.actSci = embarque.actSci;
              
              await this.suplementoEmbarquesService.save(suplementoEmbarque);
              
              let puertoEmbarques = createContratoInput.embarques[index].puertoEmbarque;
              for(let index = 0; index < puertoEmbarques.length; index++){
                const puertoEmbarque = puertoEmbarques[index];
                var suplementoPuertoEmbarque = new CreateSuplementoPuertoEmbarqueInput();
                suplementoPuertoEmbarque.idSuplementoResumen = result2.idSuplementoResumen;
                suplementoPuertoEmbarque.idPuertoEmbarque = puertoEmbarque.idPuertoEmbarque;
                suplementoPuertoEmbarque.idEmbarque = puertoEmbarque.idEmbarque;
                suplementoPuertoEmbarque.idPuertoOrigen = puertoEmbarque.idPuertoOrigen;
                suplementoPuertoEmbarque.idPuertoDestino = puertoEmbarque.idPuertoDestino;
                await this.suplementoPuertoEmbarqueService.save(suplementoPuertoEmbarque);
              }

              let pagos = createContratoInput.embarques[index].pagos;
              for(let index = 0; index < pagos.length; index++){
                const pago = pagos[index];
                var suplementoPago = new CreateSuplementoPagoInput();
                suplementoPago.idSuplementoResumen = result2.idSuplementoResumen;
                suplementoPago.idPago = pago.idPago;
                suplementoPago.idEmbarque = pago.idEmbarque;
                suplementoPago.idFormaPago = pago.idFormaPago;
                suplementoPago.plazoPago = pago.plazoPago;
                suplementoPago.aPartirDe = pago.idPagosAPartirDe;
                suplementoPago.porciento = pago.porciento;
                await this.suplementoPagosService.save(suplementoPago);
              }
              
              let desgloses = createContratoInput.embarques[index].contratoDesglose;
              for (let index = 0; index < desgloses.length; index++) {
                const desglose = desgloses[index];
                var suplementoDesglose = new CreateSuplementoDesgloseInput();
                suplementoDesglose.idSuplementoResumen = result2.idSuplementoResumen;
                suplementoDesglose.idEmbarque = desglose.idEmbarque;
                suplementoDesglose.idReferencia = desglose.idEmbarque;
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

            let puertoEmbarques = createContratoInput.embarques[index].puertoEmbarque;
              for(let index = 0; index < puertoEmbarques.length; index++){
                const puertoEmbarque = puertoEmbarques[index];
                var inputPuertoEmbarque = new CreatePuertoEmbarqueInput();
                inputPuertoEmbarque.idPuertoEmbarque = puertoEmbarque.idPuertoEmbarque;
                inputPuertoEmbarque.idEmbarque = puertoEmbarque.idEmbarque;
                inputPuertoEmbarque.idPuertoOrigen = puertoEmbarque.idPuertoOrigen;
                inputPuertoEmbarque.idPuertoDestino = puertoEmbarque.idPuertoDestino;
                this.puertoEmbarqueService.save(inputPuertoEmbarque);
              }
            
            let desgloses = createContratoInput.embarques[index].contratoDesglose;
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

  async findOneActualizado(id: number, mostrar: number) : Promise<Contratos> {
    return new Promise<Contratos>(async (resolve, reject) => {
      let contrato = await this.contratoRepository.findOne(id,{relations:['contratoClausulas','documentacionContratos','embarques','facturaResumen','fichaCompraResumen',
      'suplementoEmbarques','suplementoResumen','suplementoClausulas']});

      if(contrato.suplementoResumen){
        if(mostrar >= contrato.suplementoResumen.length || mostrar < 0){
          reject("Indice inválido");
        }

        else{
          contrato.suplementoResumen.sort((a, b) => (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds())
        - (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds()));

          let ultimoSuplemento = contrato.suplementoResumen[mostrar];
          contrato.idBasesGenerales = contrato.idBasesGenerales;
          contrato.idFichaCosto = contrato.idFichaCosto;
          contrato.idCMarco = contrato.idCMarco;
          contrato.idMoneda = ultimoSuplemento.idMoneda;
          contrato.idFormaEntrega = ultimoSuplemento.idFormaEntrega;
          contrato.idNegociacion = ultimoSuplemento.idNegociacion;
          contrato.idIncoterm = ultimoSuplemento.idIncoterm;
          contrato.realizadoPor = ultimoSuplemento.suplementadoPor;
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

          let clausulasContrato: ContratoClausulas[] = [];
          let desglosesContrato: ContratoDesglose[] = [];
          let embarquesContrato: Embarques[] = [];
          let puertoEmbarques: PuertoEmbarque[] = [];
          let pagosEmbarques: Pagos[] = [];
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

          let embarquesSuplemento = ultimoSuplemento.suplementoEmbarques;
            for (let index = 0; index < embarquesSuplemento.length; index++) {
                const embarque = embarquesSuplemento[index];
                
                var contratoEmbarque = new Embarques();
                contratoEmbarque.idEmbarque = embarque.idEmbarque;
                contratoEmbarque.idContrato = embarque.idContrato;
                contratoEmbarque.idEjecutivo = embarque.suplementoResumen.suplementadoPor;
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
                
                embarquesContrato.push(contratoEmbarque);

                let puertoEmbarquesSuplemento = ultimoSuplemento.suplementoPuertoEmbarques.filter(desglose=> desglose.idEmbarque == embarque.idEmbarque);;
                for(let index = 0; index < puertoEmbarquesSuplemento.length; index++){
                  const puertoEmbarqueSuplemento = puertoEmbarquesSuplemento[index];
                  var puertoEmbarque = new PuertoEmbarque();
                  puertoEmbarque.idPuertoEmbarque = puertoEmbarqueSuplemento.idPuertoEmbarque;
                  puertoEmbarque.idEmbarque = puertoEmbarqueSuplemento.idEmbarque;
                  puertoEmbarque.idPuertoOrigen = puertoEmbarqueSuplemento.idPuertoOrigen;
                  puertoEmbarque.idPuertoDestino = puertoEmbarqueSuplemento.idPuertoDestino;
                  puertoEmbarques.push(puertoEmbarque);
                }

                let pagos = ultimoSuplemento.suplementoPagos.filter(desglose=> desglose.idEmbarque == embarque.idEmbarque);;
                for(let index = 0; index < pagos.length; index++){
                  const pago = pagos[index];
                  var pagoEmbarque = new Pagos();
                  pagoEmbarque.idPago = pago.idPago;
                  pagoEmbarque.idEmbarque = pago.idEmbarque;
                  pagoEmbarque.idFormaPago = pago.idFormaPago;
                  pagoEmbarque.idPagosAPartirDe = pago.aPartirDe;
                  pagoEmbarque.plazoPago = pago.plazoPago;
                  pagoEmbarque.porciento = pago.porciento;
                  pagosEmbarques.push(pagoEmbarque);
                }
                
                
                let desglosesSuplemento = ultimoSuplemento.suplementoDesgloses.filter(desglose=> desglose.idEmbarque == embarque.idEmbarque);
                for (let index = 0; index < desglosesSuplemento.length; index++) {
                  const desglose = desglosesSuplemento[index];
                  var contratoDesglose = new ContratoDesglose();
                  contratoDesglose.idContratoDesglose = null;
                  contratoDesglose.idEmbarque = desglose.idEmbarque;
                  contratoDesglose.idReferencia = desglose.idEmbarque;
                  contratoDesglose.idCodigo = desglose.idCodigo;
                  contratoDesglose.descripcionAx = desglose.descripcionSp;
                  contratoDesglose.idUnidadMedida = desglose.idUnidadMedida;
                  contratoDesglose.cantidadPorCarton = desglose.cantidadPorCarton;
                  contratoDesglose.paquete = desglose.paquete;
                  contratoDesglose.cantidadCartones = desglose.cantidadCartones;
                  contratoDesglose.volumen = desglose.volumen;
                  contratoDesglose.precio = desglose.precio;
                  contratoDesglose.precioPaquete = desglose.precioPaquete;
                  contratoDesglose.packing = desglose.packing;
                  contratoDesglose.cajas = desglose.cajas;

                  desglosesContrato.push(contratoDesglose);
                }
              }
              contrato.embarques = embarquesContrato;
              for(let index = 0; index < contrato.embarques.length; index++){
                const embarque = contrato.embarques[index];
                let desgloses = desglosesContrato.filter(desglose=> desglose.idEmbarque == embarque.idEmbarque);
                contrato.embarques[index].contratoDesgloses = desgloses;
              }

              for(let index = 0; index < contrato.embarques.length; index++){
                const embarque = contrato.embarques[index];
                let listaPuertoEmbarque = puertoEmbarques.filter(puertoEmbarque=> puertoEmbarque.idEmbarque == embarque.idEmbarque);
                contrato.embarques[index].puertoEmbarques = listaPuertoEmbarque;
              }

              for(let index = 0; index < contrato.embarques.length; index++){
                const embarque = contrato.embarques[index];
                let listaPagos = pagosEmbarques.filter(pagoEmbarque=> pagoEmbarque.idEmbarque == embarque.idEmbarque);
                contrato.embarques[index].pagos = listaPagos;
              }
        } 
      }
    resolve(contrato);
    });  
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
