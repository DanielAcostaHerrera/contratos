import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacturaContenedor } from 'src/models/entities/FacturaContenedor.entity';
import { Repository } from 'typeorm';
import { CreateFacturaContenedorInput } from './dto/create-factura-contenedor.input';

@Injectable()
export class FacturaContenedorService {
  constructor(@InjectRepository(FacturaContenedor) public readonly facturaContenedorRepository: Repository<FacturaContenedor>) {}


  async save(createFacturaContenedorInput: CreateFacturaContenedorInput) : Promise<FacturaContenedor> {
    return await this.facturaContenedorRepository.save(createFacturaContenedorInput);
  }

  async findAll(): Promise<FacturaContenedor[]> {
    return await this.facturaContenedorRepository.find({relations:['facturaResumen']});
  }

  async findOne(id: number) : Promise<FacturaContenedor> {
    return await this.facturaContenedorRepository.findOne({where: {idFacturaContenedor: id},relations:['facturaResumen']});
  }

  async remove(id: number) : Promise<any> {
    const facturaContenedor = await this.findOne(id);
    return await this.facturaContenedorRepository.remove(facturaContenedor);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const facturaContenedor = await this.facturaContenedorRepository.findByIds(id);
    return await this.facturaContenedorRepository.remove(facturaContenedor);
  }

  async removeSeveralByFacturaId(idFactura: number) : Promise<any> {
    const facturaContenedores = await this.facturaContenedorRepository.find({where: {idFactura}});
    return await this.facturaContenedorRepository.remove(facturaContenedores);
  }
}