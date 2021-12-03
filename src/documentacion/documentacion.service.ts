import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentacion } from 'src/models/entities/Documentacion.entity';
import { Repository } from 'typeorm';
import { CreateDocumentacionInput } from './dto/create-documentacion.input';

@Injectable()
export class DocumentacionService {
  constructor(@InjectRepository(Documentacion) public readonly documentacionRepository: Repository<Documentacion>) {}


  async save(createDocumentacionInput: CreateDocumentacionInput) : Promise<Documentacion> {
    return await this.documentacionRepository.save(createDocumentacionInput);
  }

  async findAll(): Promise<Documentacion[]> {
    return await this.documentacionRepository.find({ relations: ['tiposDocumento','documentacionContratos']});
  }

  async findOne(id: number) : Promise<Documentacion> {
    return await this.documentacionRepository.findOne(id, { relations: ['tiposDocumento','documentacionContratos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.documentacionRepository.delete(id);
  }
}