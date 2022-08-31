import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { FacturaDesglose } from 'src/models/entities/FacturaDesglose.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { PaisesService } from 'src/paises/paises.service';
import { ReferenciasService } from 'src/referencias/referencias.service';
import { Repository } from 'typeorm';
import { CreateFacturaDesgloseInput } from './dto/create-factura-desglose.input';

@Injectable()
export class FacturaDesgloseService {
  constructor(@InjectRepository(FacturaDesglose) public readonly facturaDesgloseRepository: Repository<FacturaDesglose>,
  private codigosParaLaVentaService: CodigosParaLaVentaService,
  private referenciasService: ReferenciasService,private paisesService: PaisesService) {}


  async save(createFacturaDesgloseInput: CreateFacturaDesgloseInput) : Promise<FacturaDesglose> {
    return await this.facturaDesgloseRepository.save(createFacturaDesgloseInput);
  }

  async findAll(): Promise<FacturaDesglose[]> {
    return await this.facturaDesgloseRepository.find({relations:['facturaResumen']});
  }

  async findOne(id: number) : Promise<FacturaDesglose> {
    return await this.facturaDesgloseRepository.findOne({where: {idFacturaDesglose: id},relations:['facturaResumen']});
  }

  async remove(id: number) : Promise<any> {
    const facturaDesglose = await this.findOne(id);
    return await this.facturaDesgloseRepository.remove(facturaDesglose);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const facturaDesglose = await this.facturaDesgloseRepository.findByIds(id);
    return await this.facturaDesgloseRepository.remove(facturaDesglose);
  }

  async removeSeveralByFacturaId(idFactura: number) : Promise<any> {
    const facturaDesgloses = await this.facturaDesgloseRepository.find({where: {idFactura}});
    return await this.facturaDesgloseRepository.remove(facturaDesgloses);
  }

  async getCodigo (Id: number) : Promise<CodigosParaLaVenta>{
    return this.codigosParaLaVentaService.findOne(Id);
  }

  async getReferencia (Id: number) : Promise<Referencias>{
    return this.referenciasService.findOne(Id);
  }

  async getPais (Id: number) : Promise<Paises>{
    return this.paisesService.findOne(Id);
  }
}
