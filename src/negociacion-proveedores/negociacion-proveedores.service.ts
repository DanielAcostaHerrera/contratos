import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionProveedores } from 'src/models/entities/NegociacionProveedores.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { NegociacionResumenService } from 'src/negociacion-resumen/negociacion-resumen.service';
import { Repository } from 'typeorm';
import { CreateNegociacionProveedoresInput } from './dto/create-negociacion-proveedores.input';

@Injectable()
export class NegociacionProveedoresService {
  constructor(@InjectRepository(NegociacionProveedores) public readonly negociacionProveedoresRepository: Repository<NegociacionProveedores>,
  private negociacionResumenService: NegociacionResumenService) {}


  async save(createNegociacionProveedoresInput: CreateNegociacionProveedoresInput) : Promise<NegociacionProveedores> {
    return await this.negociacionProveedoresRepository.save(createNegociacionProveedoresInput);
  }

  async findAll(): Promise<NegociacionProveedores[]> {
    return await this.negociacionProveedoresRepository.find();
  }

  async findOne(id: number) : Promise<NegociacionProveedores> {
    return await this.negociacionProveedoresRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const negociacionProveedores = await this.findOne(id);
    return await this.negociacionProveedoresRepository.remove(negociacionProveedores);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const negociacionProveedores = await this.negociacionProveedoresRepository.findByIds(id);
    return await this.negociacionProveedoresRepository.remove(negociacionProveedores);
  }

  async getNegociacionResumen (negociacionResumenId: number) : Promise<NegociacionResumen>{
    return this.negociacionResumenService.findOne(negociacionResumenId);
  }
}