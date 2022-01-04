import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { SuplementoDesglose } from 'src/models/entities/SuplementoDesglose.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoDesgloseInput } from './dto/create-suplemento-desglose.input';

@Injectable()
export class SuplementoDesgloseService {
  constructor(@InjectRepository(SuplementoDesglose) public readonly suplementoDesgloseRepository: Repository<SuplementoDesglose>,
  private embarquesService: EmbarquesService, private suplementoResumenService: SuplementoResumenService) {}


  async save(createSuplementoDesgloseInput: CreateSuplementoDesgloseInput) : Promise<SuplementoDesglose> {
    return await this.suplementoDesgloseRepository.save(createSuplementoDesgloseInput);
  }

  async findAll(): Promise<SuplementoDesglose[]> {
    return await this.suplementoDesgloseRepository.find();
  }

  async findOne(id: number) : Promise<SuplementoDesglose> {
    return await this.suplementoDesgloseRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const suplementoDesglose = await this.findOne(id);
    return await this.suplementoDesgloseRepository.remove(suplementoDesglose);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoDesglose = await this.suplementoDesgloseRepository.findByIds(id);
    return await this.suplementoDesgloseRepository.remove(suplementoDesglose);
  }

  async getSuplementoResumen (id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(id);
  }

  async getEmbarque (id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(id);
  }
}
