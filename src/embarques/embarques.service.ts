import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniasNavierasService } from 'src/companias-navieras/companias-navieras.service';
import { ContratoDesgloseService } from 'src/contrato-desglose/contrato-desglose.service';
import { CreateContratoDesgloseInput } from 'src/contrato-desglose/dto/create-contrato-desglose.input';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { CreateSuplementoChangeInput } from 'src/suplemento-change/dto/create-suplemento-change.input';
import { SuplementoChangeService } from 'src/suplemento-change/suplemento-change.service';
import { CreateSuplementoDesgloseInput } from 'src/suplemento-desglose/dto/create-suplemento-desglose.input';
import { SuplementoDesgloseService } from 'src/suplemento-desglose/suplemento-desglose.service';
import { CreateSuplementoEmbarqueInput } from 'src/suplemento-embarques/dto/create-suplemento-embarque.input';
import { SuplementoEmbarquesService } from 'src/suplemento-embarques/suplemento-embarques.service';
import { Repository } from 'typeorm';
import { CreateEmbarqueInput } from './dto/create-embarque.input';

@Injectable()
export class EmbarquesService {
  constructor(@InjectRepository(Embarques) public readonly embarquesRepository: Repository<Embarques>,
  private ejecutivoService: EjecutivoService, private contratoDesgloseService: ContratoDesgloseService,
  private companiasNavierasService: CompaniasNavierasService, private suplementoChangeService: SuplementoChangeService,
  private suplementoEmbarquesService: SuplementoEmbarquesService, private suplementoDesgloseService: SuplementoDesgloseService) {}


  async save(createEmbarqueInput: CreateEmbarqueInput) : Promise<Embarques> {
    var result: Embarques;
    
    if(createEmbarqueInput.idEmbarque){
      let suplementoEmbarque = new CreateSuplementoEmbarqueInput();
      let suplementoChange = new CreateSuplementoChangeInput();
      let embarqueViejo = await this.findOne(createEmbarqueInput.idEmbarque)
      let contrato = embarqueViejo.contratos;

      suplementoEmbarque.idEmbarque = createEmbarqueInput.idEmbarque;
      suplementoEmbarque.idSuplementoResumen = contrato.suplementoResumen[0].idSuplementoResumen;
      suplementoEmbarque.idContrato = contrato.idContrato;
      suplementoEmbarque.numero = createEmbarqueInput.numero;

      suplementoEmbarque.fechaEntrega = createEmbarqueInput.fechaEntrega;
      if(embarqueViejo.fechaEntrega != createEmbarqueInput.fechaEntrega){
        suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
        suplementoChange.orden = null;
        suplementoChange.idCambio = 3;
        suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
        suplementoChange.contenidoViejo = embarqueViejo.fechaEntrega.toString();
        suplementoChange.contenidoNuevo = createEmbarqueInput.fechaEntrega.toString();    
        suplementoChange.clausula = "Fecha de entrega";
        this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.descuento = createEmbarqueInput.descuento;
        if(embarqueViejo.descuento != createEmbarqueInput.descuento){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.descuento.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.descuento.toString();    
          suplementoChange.clausula = "Descuento";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.terminado = createEmbarqueInput.terminado;
        if(embarqueViejo.terminado != createEmbarqueInput.terminado){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.terminado.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.terminado.toString();    
          suplementoChange.clausula = "Terminado";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.cancelado = createEmbarqueInput.cancelado;
        if(embarqueViejo.cancelado != createEmbarqueInput.cancelado){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.cancelado.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.cancelado.toString();    
          suplementoChange.clausula = "Cancelado";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.porFirmar = createEmbarqueInput.porFirmar;
        if(embarqueViejo.porFirmar != createEmbarqueInput.porFirmar){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.porFirmar.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.porFirmar.toString();    
          suplementoChange.clausula = "Por firmar";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.qtyCnt = createEmbarqueInput.qtyCnt;
        if(embarqueViejo.qtyCnt != createEmbarqueInput.qtyCnt){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.qtyCnt.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.qtyCnt.toString();    
          suplementoChange.clausula = "qtyCnt";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.flete = createEmbarqueInput.flete;
        if(embarqueViejo.flete != createEmbarqueInput.flete){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.flete.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.flete.toString();    
          suplementoChange.clausula = "Flete";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.seguro = createEmbarqueInput.seguro;
        if(embarqueViejo.seguro != createEmbarqueInput.seguro){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.seguro.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.seguro.toString();    
          suplementoChange.clausula = "Seguro";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.financiamiento = createEmbarqueInput.financiamiento;
        if(embarqueViejo.financiamiento != createEmbarqueInput.financiamiento){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.financiamiento.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.financiamiento.toString();    
          suplementoChange.clausula = "Financiamiento";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.idEmpresaNaviera = createEmbarqueInput.idEmpresaNaviera;
        if(embarqueViejo.idEmpresaNaviera != createEmbarqueInput.idEmpresaNaviera){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.idEmpresaNaviera.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.idEmpresaNaviera.toString();    
          suplementoChange.clausula = "Empresa Naviera";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.inspeccion = createEmbarqueInput.inspeccion;
        if(embarqueViejo.inspeccion != createEmbarqueInput.inspeccion){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.inspeccion.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.inspeccion.toString();    
          suplementoChange.clausula = "Inspeccion";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.otros = createEmbarqueInput.otros;
        if(embarqueViejo.otros != createEmbarqueInput.otros){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.otros.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.otros.toString();    
          suplementoChange.clausula = "Otros";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.c40 = createEmbarqueInput.c40;
        if(embarqueViejo.c40 != createEmbarqueInput.c40){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.c40.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.c40.toString();    
          suplementoChange.clausula = "c40";
          this.suplementoChangeService.save(suplementoChange);
        }

        suplementoEmbarque.c20 = createEmbarqueInput.c20;
        if(embarqueViejo.c20 != createEmbarqueInput.c20){
          suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
          suplementoChange.orden = null;
          suplementoChange.idCambio = 3;
          suplementoChange.idSuplementoResumen = suplementoEmbarque.idSuplementoResumen;
          suplementoChange.contenidoViejo = embarqueViejo.c20.toString();
          suplementoChange.contenidoNuevo = createEmbarqueInput.c20.toString();    
          suplementoChange.clausula = "c20";
          this.suplementoChangeService.save(suplementoChange);
        }

        let embarqueSuplemento = await this.suplementoEmbarquesService.save(suplementoEmbarque);

        let desgloses = createEmbarqueInput.contratoDesglose;
        for (let index = 0; index < desgloses.length; index++) {
          const desglose = desgloses[index];
          const desgloseViejo = embarqueViejo.contratoDesgloses.find(desglose2=> desglose2.idContratoDesglose == desglose.idContratoDesglose);

          var suplementoDesglose = new CreateSuplementoDesgloseInput();
          suplementoDesglose.idSuplementoResumen = embarqueSuplemento.idSuplementoResumen;
          suplementoDesglose.idEmbarque = createEmbarqueInput.idEmbarque;
          
          suplementoDesglose.idReferencia = desglose.idReferencia;
          if(desgloseViejo.idReferencia != desglose.idReferencia){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.idReferencia.toString();
            suplementoChange.contenidoNuevo = desglose.idReferencia.toString();    
            suplementoChange.clausula = "Referencia";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.idCodigo = desglose.idCodigo;
          if(desgloseViejo.idCodigo != desglose.idCodigo){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.idCodigo.toString();
            suplementoChange.contenidoNuevo = desglose.idCodigo.toString();    
            suplementoChange.clausula = "Codigo";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.descripcionSp = desglose.descripcionAx;
          if(desgloseViejo.descripcionAx != desglose.descripcionAx){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.descripcionAx.toString();
            suplementoChange.contenidoNuevo = desglose.descripcionAx.toString();    
            suplementoChange.clausula = "Descripcion";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.idUnidadMedida = desglose.idUnidadMedida;
          if(desgloseViejo.idUnidadMedida != desglose.idUnidadMedida){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.idUnidadMedida.toString();
            suplementoChange.contenidoNuevo = desglose.idUnidadMedida.toString();    
            suplementoChange.clausula = "Unidad de Medida";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.cantidadPorCarton = desglose.cantidadPorCarton;
          if(desgloseViejo.cantidadPorCarton != desglose.cantidadPorCarton){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.cantidadPorCarton.toString();
            suplementoChange.contenidoNuevo = desglose.cantidadPorCarton.toString();    
            suplementoChange.clausula = "Cantidad por carton";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.paquete = desglose.paquete;
          if(desgloseViejo.paquete != desglose.paquete){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.paquete.toString();
            suplementoChange.contenidoNuevo = desglose.paquete.toString();    
            suplementoChange.clausula = "Paquete";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.cantidadCartones = desglose.cantidadCartones;
          if(desgloseViejo.cantidadCartones != desglose.cantidadCartones){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.cantidadCartones.toString();
            suplementoChange.contenidoNuevo = desglose.cantidadCartones.toString();    
            suplementoChange.clausula = "Cantidad de cartones";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.volumen = desglose.volumen;
          if(desgloseViejo.volumen != desglose.volumen){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.volumen.toString();
            suplementoChange.contenidoNuevo = desglose.volumen.toString();    
            suplementoChange.clausula = "Volumen";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.precio = desglose.precio;
          if(desgloseViejo.precio != desglose.precio){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.precio.toString();
            suplementoChange.contenidoNuevo = desglose.precio.toString();    
            suplementoChange.clausula = "Precio";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.precioPaquete = desglose.precioPaquete;
          if(desgloseViejo.precioPaquete != desglose.precioPaquete){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.precioPaquete.toString();
            suplementoChange.contenidoNuevo = desglose.precioPaquete.toString();    
            suplementoChange.clausula = "Precio paquete";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.packing = desglose.packing;
          if(desgloseViejo.packing != desglose.packing){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.packing.toString();
            suplementoChange.contenidoNuevo = desglose.packing.toString();    
            suplementoChange.clausula = "Packing";
            this.suplementoChangeService.save(suplementoChange);
          }

          suplementoDesglose.cajas = desglose.cajas;
          if(desgloseViejo.cajas != desglose.cajas){
            suplementoChange.idEmbarque = createEmbarqueInput.idEmbarque;
            suplementoChange.orden = null;
            suplementoChange.idCambio = 3;
            suplementoChange.idSuplementoResumen = suplementoDesglose.idSuplementoResumen;
            suplementoChange.contenidoViejo = desgloseViejo.cajas.toString();
            suplementoChange.contenidoNuevo = desglose.cajas.toString();    
            suplementoChange.clausula = "Cajas";
            this.suplementoChangeService.save(suplementoChange);
          }

          await this.suplementoDesgloseService.save(suplementoDesglose); 
        }

        let embarque: Embarques;
        embarque.idContrato = createEmbarqueInput.idContrato;
        embarque.idEjecutivo = createEmbarqueInput.idEjecutivo;
        embarque.fechaEntrega = createEmbarqueInput.fechaEntrega;
        embarque.numero = createEmbarqueInput.numero;
        embarque.descuento = createEmbarqueInput.descuento;
        embarque.terminado = createEmbarqueInput.terminado;
        embarque.cancelado = createEmbarqueInput.cancelado;
        embarque.porFirmar = createEmbarqueInput.porFirmar;
        embarque.qtyCnt = createEmbarqueInput.qtyCnt;
        embarque.flete = createEmbarqueInput.flete;
        embarque.seguro = createEmbarqueInput.seguro;
        embarque.financiamiento = createEmbarqueInput.financiamiento;
        embarque.idEmpresaNaviera = createEmbarqueInput.idEmpresaNaviera;
        embarque.inspeccion = createEmbarqueInput.inspeccion;
        embarque.otros = createEmbarqueInput.otros;
        embarque.c40 = createEmbarqueInput.c40;
        embarque.c20 = createEmbarqueInput.c20;
        embarque.actSci = createEmbarqueInput.actSci;
        
        return embarque;
    }

    if(!createEmbarqueInput.idEmbarque){
      createEmbarqueInput.terminado = false;
      createEmbarqueInput.cancelado = false;
      result = await this.embarquesRepository.save(createEmbarqueInput);

      if(result){
        let desgloses = createEmbarqueInput.contratoDesglose;
        for (let index = 0; index < desgloses.length; index++) {
          const desglose = desgloses[index];
          
          var contratoDesglose = new CreateContratoDesgloseInput();
          contratoDesglose.idEmbarque = result.idEmbarque;
          contratoDesglose.idContratoDesglose = desglose.idContratoDesglose;
          contratoDesglose.idReferencia = desglose.idReferencia;
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
          
          await this.contratoDesgloseService.save(contratoDesglose)        
        }
      }
    }
    
    return result
  }

  async findAll(): Promise<Embarques[]> {
    return await this.embarquesRepository.find({relations:['contratos','contratoDesgloses', 'facturaResumen','suplementoChanges','suplementoDesgloses','suplementoEmbarques',
    'suplementoPagos','puertoEmbarques']});
  }

  async findOne(id: number) : Promise<Embarques> {
    let embarque = await this.embarquesRepository.findOne(id,{relations:['contratos','contratoDesgloses', 'facturaResumen','suplementoChanges','suplementoDesgloses',
    'suplementoEmbarques','suplementoPagos','puertoEmbarques']});

    let contrato = embarque.contratos;

    if(contrato.suplementoResumen){
      contrato.suplementoResumen.sort((a, b) => (b.fecha.getFullYear()+b.fecha.getMonth()+b.fecha.getDate()+b.fecha.getHours()+b.fecha.getMinutes()+b.fecha.getSeconds())
      - (a.fecha.getFullYear()+a.fecha.getMonth()+a.fecha.getDate()+a.fecha.getHours()+a.fecha.getMinutes()+a.fecha.getSeconds()));

      let ultimoSuplementoResumen = contrato.suplementoResumen[0];
      let suplementoEmbarqueArray = ultimoSuplementoResumen.suplementoEmbarques.filter(embarque2=> embarque2.idEmbarque == embarque.idEmbarque)
      if(suplementoEmbarqueArray.length > 1){
        suplementoEmbarqueArray.sort((a, b) => b.idSuplementoEmbarques - a.idSuplementoEmbarques);
      }
      let suplementoEmbarque = suplementoEmbarqueArray[0];
      

      embarque.idContrato = suplementoEmbarque.idContrato;
      embarque.idEjecutivo = suplementoEmbarque.suplementoResumen.idEjecutivo;
      embarque.fechaEntrega = suplementoEmbarque.fechaEntrega;
      embarque.numero = suplementoEmbarque.numero;
      embarque.descuento = suplementoEmbarque.descuento;
      embarque.terminado = suplementoEmbarque.terminado;
      embarque.cancelado = suplementoEmbarque.cancelado;
      embarque.porFirmar = suplementoEmbarque.porFirmar;
      embarque.qtyCnt = suplementoEmbarque.qtyCnt;
      embarque.flete = suplementoEmbarque.flete;
      embarque.seguro = suplementoEmbarque.seguro;
      embarque.financiamiento = suplementoEmbarque.financiamiento;
      embarque.idEmpresaNaviera = suplementoEmbarque.idEmpresaNaviera;
      embarque.inspeccion = suplementoEmbarque.inspeccion;
      embarque.otros = suplementoEmbarque.otros;
      embarque.c40 = suplementoEmbarque.c40;
      embarque.c20 = suplementoEmbarque.c20;
      embarque.actSci = suplementoEmbarque.actSci;

      let desgloseContrato: ContratoDesglose[];
      let desgloseSuplemento = ultimoSuplementoResumen.suplementoDesgloses.filter(desglose=> desglose.idEmbarque == embarque.idEmbarque);
      //let idContratoDesgloseTemp = (await this.contratoDesgloseService.findAll()).sort((a, b) => b.idContratoDesglose - a.idContratoDesglose)[0].idContratoDesglose+1
      
      for (let index = 0; index < desgloseSuplemento.length; index++) {
        const desglose = desgloseSuplemento[index];
        
        var contratoDesglose = new ContratoDesglose();
        contratoDesglose.idContratoDesglose = null;
        //idContratoDesgloseTemp += 1;
        contratoDesglose.idEmbarque = desglose.idEmbarque;
        contratoDesglose.idReferencia = desglose.idReferencia;
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
        
        desgloseContrato.push(contratoDesglose);    
      }
      embarque.contratoDesgloses = desgloseContrato;

    }

    return embarque;
  }

  async remove(id: number) : Promise<any> {
    const embarques = await this.findOne(id);
    return await this.embarquesRepository.remove(embarques);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const embarques = await this.embarquesRepository.findByIds(id);
    return await this.embarquesRepository.remove(embarques);
  }

  async getEjecutivo (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getCompaniaNaviera (Id: number) : Promise<CompaniasNavieras>{
    return this.companiasNavierasService.findOne(Id);
  }
}
