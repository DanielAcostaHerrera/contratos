import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PliegoConcurrencia } from 'src/models/entities/PliegoConcurrencia.entity';
import { In, Repository } from 'typeorm';
import { CreatePliegoConcurrenciaInput } from './dto/create-pliego-concurrencia.input';

@Injectable()
export class PliegoConcurrenciaService {
  constructor(@InjectRepository(PliegoConcurrencia) public readonly pliegoConcurrenciaRepository: Repository<PliegoConcurrencia>) {}


  async save(createPliegoConcurrenciaInput: CreatePliegoConcurrenciaInput) : Promise<PliegoConcurrencia> {
    return await this.pliegoConcurrenciaRepository.save(createPliegoConcurrenciaInput);
  }

  async findAll(): Promise<PliegoConcurrencia[]> { 
    return await this.pliegoConcurrenciaRepository.find({relations:['pliegoConcurrenciaResumen','oferta']});
  }

  async findOne(id: number) : Promise<PliegoConcurrencia> {
    return await this.pliegoConcurrenciaRepository.findOne({where: {idPliego: id},relations:['pliegoConcurrenciaResumen','oferta']});
  }

  async remove(id: number) : Promise<any> {
    const pliegoConcurrencia = await this.findOne(id);
    return await this.pliegoConcurrenciaRepository.remove(pliegoConcurrencia);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const pliegoConcurrencia = await this.pliegoConcurrenciaRepository.findBy({
      idPliego: In(id)
  });
    return await this.pliegoConcurrenciaRepository.remove(pliegoConcurrencia);
  }
}
