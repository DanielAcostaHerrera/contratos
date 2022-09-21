import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { In, Repository } from 'typeorm';
import { CreateSuplementoResumanInput } from './dto/create-suplemento-resuman.input';

@Injectable()
export class SuplementoResumenService {
  constructor(@InjectRepository(SuplementoResumen) public readonly suplementoResumenRepository: Repository<SuplementoResumen>) {}


  async save(createSuplementoResumanInput: CreateSuplementoResumanInput) : Promise<SuplementoResumen> {
    return await this.suplementoResumenRepository.save(createSuplementoResumanInput);
  }

  async findAll(): Promise<SuplementoResumen[]> {
    return await this.suplementoResumenRepository.find({ relations: ['contrato','formaEntrega','incoterm','ejecutivoSuplementa','ejecutivo','ejecutivoFirma',
    'moneda','empresaNaviera','negociacion']});
  }

  async findOne(id: number) : Promise<SuplementoResumen> {
    return await this.suplementoResumenRepository.findOne({where: {idSuplementoResumen: id}, relations: ['suplementoChanges','suplementoClausulas','suplementoDesgloses',
    'suplementoEmbarques','suplementoPagos','contrato','suplementoPuertoEmbarques','formaEntrega','incoterm','ejecutivoSuplementa','ejecutivo','ejecutivoFirma',
    'moneda','empresaNaviera','negociacion']});
  }

  async remove(id: number) : Promise<any> {
    const suplementoResumen = await this.findOne(id);
    return await this.suplementoResumenRepository.remove(suplementoResumen);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoResumen = await this.suplementoResumenRepository.findBy({
      idSuplementoResumen: In(id)
  });
    return await this.suplementoResumenRepository.remove(suplementoResumen);
  }
}
