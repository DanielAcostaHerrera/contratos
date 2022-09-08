import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosEntidadService } from 'src/datos-entidad/datos-entidad.service';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { DatosEntidad } from 'src/models/entities/DatosEntidad.entity';
import { In, Repository } from 'typeorm';
import { CreateCompradoresInput } from './dto/create-compradores.input';

@Injectable()
export class CompradoresService {
  constructor(@InjectRepository(Compradores) public readonly compradoresRepository: Repository<Compradores>, private datosEntidadService: DatosEntidadService) {}


  async save(createCompradoresInput: CreateCompradoresInput) : Promise<Compradores> {
    return await this.compradoresRepository.save(createCompradoresInput);
  }

  async findAll(): Promise<Compradores[]> {
    return await this.compradoresRepository.find({relations: ['entidad']});
  }

  async findOne(id: number) : Promise<Compradores> {
    return await this.compradoresRepository.findOne({where: {idComprador: id},relations: ['entidad']});
  }

  async remove(id: number) : Promise<any> {
    const compradores = await this.findOne(id);
    return await this.compradoresRepository.remove(compradores);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const compradores = await this.compradoresRepository.findBy({
      idComprador: In(id)
  });
    return await this.compradoresRepository.remove(compradores);
  }

  async getEntidad (id: number) : Promise<DatosEntidad>{
    return this.datosEntidadService.findOne(id);
  }
}
  