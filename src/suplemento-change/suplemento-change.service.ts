import { CambiosSuplementos } from 'src/models/entities/CambiosSuplementos.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuplementoChange } from 'src/models/entities/SuplementoChange.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoChangeInput } from './dto/create-suplemento-change.input';
import { CambiosSuplementosService } from 'src/cambios-suplementos/cambios-suplementos.service';

@Injectable()
export class SuplementoChangeService {
  constructor(@InjectRepository(SuplementoChange) public readonly suplementoChangeRepository: Repository<SuplementoChange>,
  private suplementoResumenService: SuplementoResumenService, private cambiosSuplementosService: CambiosSuplementosService) {}


  async save(createSuplementoChangeInput: CreateSuplementoChangeInput) : Promise<SuplementoChange> {
    return await this.suplementoChangeRepository.save(createSuplementoChangeInput);
  }

  async findAll(): Promise<SuplementoChange[]> {
    return await this.suplementoChangeRepository.find();
  }

  async findOne(id: number) : Promise<SuplementoChange> {
    return await this.suplementoChangeRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const suplementoChange = await this.findOne(id);
    return await this.suplementoChangeRepository.remove(suplementoChange);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoChange = await this.suplementoChangeRepository.findByIds(id);
    return await this.suplementoChangeRepository.remove(suplementoChange);
  }

  async removeSeveralBySuplementoResumenId(idSuplementoResumen: number) : Promise<any> {
    const suplementoResumen = await this.suplementoChangeRepository.find({where: {idSuplementoResumen}});
    return await this.suplementoChangeRepository.remove(suplementoResumen);
  }

  async getSuplementoResumen (id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(id);
  }

  async getCambioSuplemento (id: number) : Promise<CambiosSuplementos>{
    return this.cambiosSuplementosService.findOne(id);
  }
}
