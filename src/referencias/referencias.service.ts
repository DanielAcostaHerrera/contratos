import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReferenciasService {
  constructor(@InjectRepository(Referencias) public readonly referenciasRepository: Repository<Referencias>) {}

  async findAll(): Promise<Referencias[]> {
    return await this.referenciasRepository.find({relations:['codigo']});
  }

  async findOne(id: number) : Promise<Referencias> {
    return await this.referenciasRepository.findOne({where: {referenciaId: id},relations:['codigo']});
  }
}
