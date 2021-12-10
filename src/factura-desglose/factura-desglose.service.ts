import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacturaResumenService } from 'src/factura-resumen/factura-resumen.service';
import { FacturaDesglose } from 'src/models/entities/FacturaDesglose.entity';
import { FacturaResumen } from 'src/models/entities/FacturaResumen.entity';
import { Repository } from 'typeorm';
import { CreateFacturaDesgloseInput } from './dto/create-factura-desglose.input';

@Injectable()
export class FacturaDesgloseService {
  constructor(@InjectRepository(FacturaDesglose) public readonly facturaDesgloseRepository: Repository<FacturaDesglose>,
  private facturaResumenService: FacturaResumenService) {}


  async save(createFacturaDesgloseInput: CreateFacturaDesgloseInput) : Promise<FacturaDesglose> {
    return await this.facturaDesgloseRepository.save(createFacturaDesgloseInput);
  }

  async findAll(): Promise<FacturaDesglose[]> {
    return await this.facturaDesgloseRepository.find();
  }

  async findOne(id: number) : Promise<FacturaDesglose> {
    return await this.facturaDesgloseRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.facturaDesgloseRepository.delete(id);
  }

  async getFacturaResumen (Id: number) : Promise<FacturaResumen>{
    return this.facturaResumenService.findOne(Id);
  }
}
