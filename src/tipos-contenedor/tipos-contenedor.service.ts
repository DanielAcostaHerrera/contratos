import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposContenedor } from 'src/models/entities/TiposContenedor.entity';
import { In, Repository } from 'typeorm';
import { CreateTiposContenedorInput } from './dto/create-tipos-contenedor.input';

@Injectable()
export class TiposContenedorService {
  constructor(@InjectRepository(TiposContenedor) public readonly tiposContenedorRepository: Repository<TiposContenedor>) {}


  async save(createTiposContenedorInput: CreateTiposContenedorInput) : Promise<TiposContenedor> {
    return await this.tiposContenedorRepository.save(createTiposContenedorInput);
  }

  async findAll(): Promise<TiposContenedor[]> {
    return await this.tiposContenedorRepository.find();
  }

  async findOne(id: number) : Promise<TiposContenedor> {
    return await this.tiposContenedorRepository.findOne({where: {idTipoContenedor: id},});
  }

  async remove(id: number) : Promise<any> {
    const tiposContenedor = await this.findOne(id);
    return await this.tiposContenedorRepository.remove(tiposContenedor);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const tiposContenedor = await this.tiposContenedorRepository.findBy({
      idTipoContenedor: In(id)
  });
    return await this.tiposContenedorRepository.remove(tiposContenedor);
  }
}
