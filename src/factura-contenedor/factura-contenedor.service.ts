import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContenedoresService } from 'src/contenedores/contenedores.service';
import { FacturaResumenService } from 'src/factura-resumen/factura-resumen.service';
import { Contenedores } from 'src/models/entities/Contenedores.entity';
import { FacturaContenedor } from 'src/models/entities/FacturaContenedor.entity';
import { FacturaResumen } from 'src/models/entities/FacturaResumen.entity';
import { Repository } from 'typeorm';
import { CreateFacturaContenedorInput } from './dto/create-factura-contenedor.input';

@Injectable()
export class FacturaContenedorService {
  constructor(@InjectRepository(FacturaContenedor) public readonly facturaContenedorRepository: Repository<FacturaContenedor>,
  private facturaResumenService: FacturaResumenService,private contenedoresService: ContenedoresService,) {}


  async save(createFacturaContenedorInput: CreateFacturaContenedorInput) : Promise<FacturaContenedor> {
    return await this.facturaContenedorRepository.save(createFacturaContenedorInput);
  }

  async findAll(): Promise<FacturaContenedor[]> {
    return await this.facturaContenedorRepository.find();
  }

  async findOne(id: number) : Promise<FacturaContenedor> {
    return await this.facturaContenedorRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const facturaContenedor = await this.findOne(id);
    return await this.facturaContenedorRepository.remove(facturaContenedor);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const facturaContenedor = await this.facturaContenedorRepository.findByIds(id);
    return await this.facturaContenedorRepository.remove(facturaContenedor);
  }

  async getFacturaResumen (Id: number) : Promise<FacturaResumen>{
    return this.facturaResumenService.findOne(Id);
  }

  async getContenedor (Id: number) : Promise<Contenedores>{
    return this.contenedoresService.findOne(Id);
  }
}