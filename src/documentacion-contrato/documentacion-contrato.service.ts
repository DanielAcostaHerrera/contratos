import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentacionContrato } from 'src/models/entities/DocumentacionContrato.entity';
import { In, Repository } from 'typeorm';
import { CreateDocumentacionContratoInput } from './dto/create-documentacion-contrato.input';

@Injectable()
export class DocumentacionContratoService {
  constructor(@InjectRepository(DocumentacionContrato) public readonly documentacionContratoRepository: Repository<DocumentacionContrato>) {}


  async save(createDocumentacionContratoInput: CreateDocumentacionContratoInput) : Promise<DocumentacionContrato> {
    return await this.documentacionContratoRepository.save(createDocumentacionContratoInput);
  }

  async findAll(): Promise<DocumentacionContrato[]> {
    return await this.documentacionContratoRepository.find({relations:['contratos','documentacion']});
  }

  async findOne(id: number) : Promise<DocumentacionContrato> {
    return await this.documentacionContratoRepository.findOne({where: {idDocumentacionContrato: id},relations:['contratos','documentacion']});
  }

  async remove(id: number) : Promise<any> {
    const documentacionContrato = await this.findOne(id);
    return await this.documentacionContratoRepository.remove(documentacionContrato);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const documentacionContrato = await this.documentacionContratoRepository.findBy({
      idDocumentacionContrato: In(id)
  });
    return await this.documentacionContratoRepository.remove(documentacionContrato);
  }
}
