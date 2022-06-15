import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratosService } from 'src/contratos/contratos.service';
import { EjecutivoService } from 'src/ejecutivo/ejecutivo.service';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { CreateFacturaContenedorInput } from 'src/factura-contenedor/dto/create-factura-contenedor.input';
import { FacturaContenedorService } from 'src/factura-contenedor/factura-contenedor.service';
import { CreateFacturaDesgloseInput } from 'src/factura-desglose/dto/create-factura-desglose.input';
import { FacturaDesgloseService } from 'src/factura-desglose/factura-desglose.service';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { FacturaResumen } from 'src/models/entities/FacturaResumen.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { PuertosService } from 'src/puertos/puertos.service';
import { Repository } from 'typeorm';
import { CreateFacturaResumanInput } from './dto/create-factura-resuman.input';

@Injectable()
export class FacturaResumenService {
  constructor(@InjectRepository(FacturaResumen) public readonly facturaResumenRepository: Repository<FacturaResumen>,
  private contratosService: ContratosService,private embarquesService: EmbarquesService,
  private ejecutivoService: EjecutivoService, private puertosService: PuertosService,private facturaDesgloseService: FacturaDesgloseService,
  private facturaContenedorService: FacturaContenedorService) {}


  async save(createFacturaResumanInput: CreateFacturaResumanInput) : Promise<FacturaResumen> {
    var result: FacturaResumen;

    if(createFacturaResumanInput.idFactura){

      await this.facturaDesgloseService.removeSeveralByFacturaId(createFacturaResumanInput.idFactura);
      await this.facturaContenedorService.removeSeveralByFacturaId(createFacturaResumanInput.idFactura);

      result = await this.facturaResumenRepository.save(createFacturaResumanInput);
      
      if(result){
        let facturaDesgloses = createFacturaResumanInput.facturaDesgloses;
        for (let index = 0; index < facturaDesgloses.length; index++) {
          const desglose = facturaDesgloses[index];
          
          var desgloseFactura = new CreateFacturaDesgloseInput();
          desgloseFactura.idFactura = result.idFactura;
          desgloseFactura.idFacturaDesglose = desglose.idFacturaDesglose;
          desgloseFactura.idReferencia = desglose.idReferencia;
          desgloseFactura.idCodigo = desglose.idCodigo;
          desgloseFactura.paquete = desglose.paquete;
          desgloseFactura.bultos = desglose.bultos;
          desgloseFactura.cantidad = desglose.cantidad;
          desgloseFactura.precioPaquete = desglose.precioPaquete;
          desgloseFactura.precio = desglose.precio;
          desgloseFactura.idPaisOrigen = desglose.idPaisOrigen;
          desgloseFactura.suplemento = desglose.suplemento;
          desgloseFactura.packing = desglose.packing;
          desgloseFactura.cajas = desglose.cajas;
          
          await this.facturaDesgloseService.save(desgloseFactura);        
        }

        let facturaContenedores = createFacturaResumanInput.facturaContenedores;
        for (let index = 0; index < facturaContenedores.length; index++) {
          const contenedor = facturaContenedores[index];
          
          var contenedorFactura = new CreateFacturaContenedorInput();
          contenedorFactura.idFactura = result.idFactura;
          contenedorFactura.idFacturaContenedor = contenedor.idFacturaContenedor;
          contenedorFactura.idContenedor = contenedor.idContenedor;
          
          await this.facturaContenedorService.save(contenedorFactura);        
        }
      }
    }

    if(!createFacturaResumanInput.idFactura){

      result = await this.facturaResumenRepository.save(createFacturaResumanInput);
      
      if(result){
        let facturaDesgloses = createFacturaResumanInput.facturaDesgloses;
        for (let index = 0; index < facturaDesgloses.length; index++) {
          const desglose = facturaDesgloses[index];
          
          var desgloseFactura = new CreateFacturaDesgloseInput();
          desgloseFactura.idFactura = result.idFactura;
          desgloseFactura.idFacturaDesglose = desglose.idFacturaDesglose;
          desgloseFactura.idReferencia = desglose.idReferencia;
          desgloseFactura.idCodigo = desglose.idCodigo;
          desgloseFactura.paquete = desglose.paquete;
          desgloseFactura.bultos = desglose.bultos;
          desgloseFactura.cantidad = desglose.cantidad;
          desgloseFactura.precioPaquete = desglose.precioPaquete;
          desgloseFactura.precio = desglose.precio;
          desgloseFactura.idPaisOrigen = desglose.idPaisOrigen;
          desgloseFactura.suplemento = desglose.suplemento;
          desgloseFactura.packing = desglose.packing;
          desgloseFactura.cajas = desglose.cajas;
          
          await this.facturaDesgloseService.save(desgloseFactura);        
        }

        let facturaContenedores = createFacturaResumanInput.facturaContenedores;
        for (let index = 0; index < facturaContenedores.length; index++) {
          const contenedor = facturaContenedores[index];
          
          var contenedorFactura = new CreateFacturaContenedorInput();
          contenedorFactura.idFactura = result.idFactura;
          contenedorFactura.idFacturaContenedor = contenedor.idFacturaContenedor;
          contenedorFactura.idContenedor = contenedor.idContenedor;
          
          await this.facturaContenedorService.save(contenedorFactura);        
        }
      }
    }
    return result;
  }

  async findAll(): Promise<FacturaResumen[]> { 
    return await this.facturaResumenRepository.find({relations:['facturaContenedores','facturaDesgloses']});
  }

  async findOne(id: number) : Promise<FacturaResumen> {
    return await this.facturaResumenRepository.findOne(id,{relations:['facturaContenedores','facturaDesgloses']});
  }

  async remove(id: number) : Promise<any> {
    const facturaResumen = await this.findOne(id);
    return await this.facturaResumenRepository.remove(facturaResumen);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const facturaResumen = await this.facturaResumenRepository.findByIds(id);
    return await this.facturaResumenRepository.remove(facturaResumen);
  }

  async getContrato (Id: number) : Promise<Contratos>{
    return this.contratosService.findOne(Id);
  }

  async getEmbarque (Id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(Id);
  }

  async getEjecutivo (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getEjecutivoRealiza (Id: number) : Promise<Ejecutivos>{
    return this.ejecutivoService.findOne(Id);
  }

  async getPuertoDestino (Id: number) : Promise<Puertos>{
    return this.puertosService.findOne(Id);
  }
}
