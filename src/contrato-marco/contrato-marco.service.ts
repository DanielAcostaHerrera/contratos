import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratoMarco } from '../models/entities/ContratoMarco.entity';
import { Proveedores } from '../modelsMercurio/entities/Proveedores.entity';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { Repository } from 'typeorm';
import { CreateContratoMarcoInput } from './dto/create-contrato-marco.input';

@Injectable()
export class ContratoMarcoService {
  constructor(@InjectRepository(ContratoMarco) public readonly contratoMarcoRepository: Repository<ContratoMarco>,
  private proveedoresService: ProveedoresService) {}

  async save(createContratoMarcoInput: CreateContratoMarcoInput) : Promise<ContratoMarco> {
    return await this.contratoMarcoRepository.save(createContratoMarcoInput);
  }

  async findAll(): Promise<ContratoMarco[]> {
    return await this.contratoMarcoRepository.find({ relations: ['contratos','FichaCostoResumen']});
  }

  async findOne(id: number) : Promise<ContratoMarco> {
    return await this.contratoMarcoRepository.findOne(id, { relations: ['contratos','FichaCostoResumen']});
  }

  async remove(id: number) : Promise<any> {
    const documentacion = await this.findOne(id);
    return await this.contratoMarcoRepository.remove(documentacion);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const contratoMarco = await this.contratoMarcoRepository.findByIds(id);
    return await this.contratoMarcoRepository.remove(contratoMarco);
  }

  async getProveedor (id: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(id);
  }
}
