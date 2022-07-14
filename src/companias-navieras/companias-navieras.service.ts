import { CompaniasNavieras } from './../modelsNomgen/entities/CompaniasNavieras.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniasNavierasService {
  constructor(@InjectRepository(CompaniasNavieras) public readonly companiasNavierasRepository: Repository<CompaniasNavieras>) {}

  async findAll(): Promise<CompaniasNavieras[]> {
    return await this.companiasNavierasRepository.find();
  }

  async findOne(id: number) : Promise<CompaniasNavieras> {
    return await this.companiasNavierasRepository.findOne(id);
  }
}
