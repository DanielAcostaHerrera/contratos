import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { In, Repository } from 'typeorm';
import { CreateEjecutivoInput } from './dto/create-ejecutivo.input';

@Injectable()
export class EjecutivoService {
  constructor(@InjectRepository(Ejecutivos) public readonly ejecutivosRepository: Repository<Ejecutivos>) {}


  async save(createEjecutivoInput: CreateEjecutivoInput) : Promise<Ejecutivos> {
    return await this.ejecutivosRepository.save(createEjecutivoInput);
  }

  async findAll(): Promise<Ejecutivos[]> {
    return await this.ejecutivosRepository.find({relations:['usuarios','cargo','grupo']});
  }

  async findOne(id: number) : Promise<Ejecutivos> {
    return await this.ejecutivosRepository.findOne({where: {idEjecutivo: id},relations:['usuarios','cargo','grupo']});
  }

  async remove(id: number) : Promise<any> {
    const ejecutivos = await this.findOne(id);
    return await this.ejecutivosRepository.remove(ejecutivos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const ejecutivos = await this.ejecutivosRepository.findBy({
      idEjecutivo: In(id)
  });
    return await this.ejecutivosRepository.remove(ejecutivos);
  }
}
