import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratosService } from 'src/contratos/contratos.service';
import { DocumentacionService } from 'src/documentacion/documentacion.service';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Documentacion } from 'src/models/entities/Documentacion.entity';
import { DocumentacionContrato } from 'src/models/entities/DocumentacionContrato.entity';
import { Repository } from 'typeorm';
import { CreateDocumentacionContratoInput } from './dto/create-documentacion-contrato.input';

@Injectable()
export class DocumentacionContratoService {
  constructor(@InjectRepository(DocumentacionContrato) public readonly documentacionContratoRepository: Repository<DocumentacionContrato>,
  private documentacionService: DocumentacionService,private contratosService: ContratosService) {}


  async save(createDocumentacionContratoInput: CreateDocumentacionContratoInput) : Promise<DocumentacionContrato> {
    return await this.documentacionContratoRepository.save(createDocumentacionContratoInput);
  }

  async findAll(): Promise<DocumentacionContrato[]> {
    return await this.documentacionContratoRepository.find();
  }

  async findOne(id: number) : Promise<DocumentacionContrato> {
    return await this.documentacionContratoRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.documentacionContratoRepository.delete(id);
  }

  async getDocumentacion (documentacionId: number) : Promise<Documentacion>{
    return this.documentacionService.findOne(documentacionId);
  }

  async getContrato (contratoId: number) : Promise<Contratos>{
    return this.contratosService.findOne(contratoId);
  }
}
