import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentacionContrato } from 'src/models/entities/DocumentacionContrato.entity';
import { Repository } from 'typeorm';
import { CreateDocumentacionContratoInput } from './dto/create-documentacion-contrato.input';

@Injectable()
export class DocumentacionContratoService {
  constructor(@InjectRepository(DocumentacionContrato) public readonly documentacionContratoRepository: Repository<DocumentacionContrato>) {}


  async save(createDocumentacionContratoInput: CreateDocumentacionContratoInput) : Promise<DocumentacionContrato> {
    return await this.documentacionContratoRepository.save(createDocumentacionContratoInput);
  }

  async findAll(): Promise<DocumentacionContrato[]> {
    return await this.documentacionContratoRepository.find({ relations: ['documentacion','contratos']});
  }

  async findOne(id: number) : Promise<DocumentacionContrato> {
    return await this.documentacionContratoRepository.findOne(id, { relations: ['documentacion','contratos']});
  }

  async remove(id: number) : Promise<any> {
    return await this.documentacionContratoRepository.delete(id);
  }
}
