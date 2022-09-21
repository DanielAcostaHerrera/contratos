import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFacturaContenedorInput } from 'src/factura-contenedor/dto/create-factura-contenedor.input';
import { FacturaContenedorService } from 'src/factura-contenedor/factura-contenedor.service';
import { CreateFacturaDesgloseInput } from 'src/factura-desglose/dto/create-factura-desglose.input';
import { FacturaDesgloseService } from 'src/factura-desglose/factura-desglose.service';
import { FacturaResumen } from 'src/models/entities/FacturaResumen.entity';
import { In, Repository } from 'typeorm';
import { CreateFacturaResumanInput } from './dto/create-factura-resuman.input';

@Injectable()
export class FacturaResumenService {
  constructor(@InjectRepository(FacturaResumen) public readonly facturaResumenRepository: Repository<FacturaResumen>,
  private facturaDesgloseService: FacturaDesgloseService,private facturaContenedorService: FacturaContenedorService) {}


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
    return await this.facturaResumenRepository.find({relations:['facturaContenedores','facturaDesgloses','contratos','embarques','ejecutivos','ejecutivoRealiza','puertoDestino']});
  }

  async findOne(id: number) : Promise<FacturaResumen> {
    return await this.facturaResumenRepository.findOne({where: {idFactura: id},relations:['facturaContenedores','facturaDesgloses','contratos','embarques','ejecutivos','ejecutivoRealiza','puertoDestino']});
  }

  async remove(id: number) : Promise<any> {
    const facturaResumen = await this.findOne(id);
    return await this.facturaResumenRepository.remove(facturaResumen);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const facturaResumen = await this.facturaResumenRepository.findBy({
      idFactura: In(id)
  });
    return await this.facturaResumenRepository.remove(facturaResumen);
  }
}
