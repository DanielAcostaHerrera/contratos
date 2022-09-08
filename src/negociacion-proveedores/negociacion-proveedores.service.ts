import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegociacionProveedores } from 'src/models/entities/NegociacionProveedores.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { In, Repository } from 'typeorm';
import { CreateNegociacionProveedoresInput } from './dto/create-negociacion-proveedores.input';

@Injectable()
export class NegociacionProveedoresService {
  constructor(@InjectRepository(NegociacionProveedores) public readonly negociacionProveedoresRepository: Repository<NegociacionProveedores>,
  private proveedoresService: ProveedoresService,) {}


  async save(createNegociacionProveedoresInput: CreateNegociacionProveedoresInput) : Promise<NegociacionProveedores> {
    return await this.negociacionProveedoresRepository.save(createNegociacionProveedoresInput);
  }

  async findAll(): Promise<NegociacionProveedores[]> {
    return await this.negociacionProveedoresRepository.find({relations: ['negociacionResumen']});
  }

  async findOne(id: number) : Promise<NegociacionProveedores> {
    return await this.negociacionProveedoresRepository.findOne({where: {idNegociacionProveedores: id},relations: ['negociacionResumen']});
  }

  async remove(id: number) : Promise<any> {
    const negociacionProveedores = await this.findOne(id);
    return await this.negociacionProveedoresRepository.remove(negociacionProveedores);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const negociacionProveedores = await this.negociacionProveedoresRepository.findBy({
      idNegociacionProveedores: In(id)
  });
    return await this.negociacionProveedoresRepository.remove(negociacionProveedores);
  }

  async removeSeveralByNegociacionId(idNegociacion: number) : Promise<any> {
    const negociacionProveedores = await this.negociacionProveedoresRepository.find({where: {idNegociacion}});
    return await this.negociacionProveedoresRepository.remove(negociacionProveedores);
  }

  async getProveedor (Id: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(Id);
  }
}