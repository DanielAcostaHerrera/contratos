import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagosAPartirDe } from 'src/models/entities/PagosAPartirDe.entity';
import { Repository } from 'typeorm';
import { CreatePagosApartirDeInput } from './dto/create-pagos-apartir-de.input';

@Injectable()
export class PagosApartirDeService {
  constructor(@InjectRepository(PagosAPartirDe) public readonly pagosAPartirDeRepository: Repository<PagosAPartirDe>) {}

  async save(createPagosApartirDeInput: CreatePagosApartirDeInput) : Promise<PagosAPartirDe> {
    return await this.pagosAPartirDeRepository.save(createPagosApartirDeInput);
  }

  async findAll(): Promise<PagosAPartirDe[]> {
    return await this.pagosAPartirDeRepository.find();
  }

  async findOne(id: number) : Promise<PagosAPartirDe> {
    return await this.pagosAPartirDeRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const puertos = await this.findOne(id);
    return await this.pagosAPartirDeRepository.remove(puertos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const puertos = await this.pagosAPartirDeRepository.findByIds(id);
    return await this.pagosAPartirDeRepository.remove(puertos);
  }
}
