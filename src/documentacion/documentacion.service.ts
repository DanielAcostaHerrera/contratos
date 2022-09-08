import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentacion } from 'src/models/entities/Documentacion.entity';
import { TiposDocumento } from 'src/models/entities/TiposDocumento.entity';
import { TiposDocumentoService } from 'src/tipos-documento/tipos-documento.service';
import { In, Repository } from 'typeorm';
import { CreateDocumentacionInput } from './dto/create-documentacion.input';

@Injectable()
export class DocumentacionService {
  constructor(@InjectRepository(Documentacion) public readonly documentacionRepository: Repository<Documentacion>,private tiposDocumentoService: TiposDocumentoService) {}


  async save(createDocumentacionInput: CreateDocumentacionInput) : Promise<Documentacion> {
    return await this.documentacionRepository.save(createDocumentacionInput);
  }

  async findAll(): Promise<Documentacion[]> {
    return await this.documentacionRepository.find({ relations: ['documentacionContratos']});
  }

  async findOne(id: number) : Promise<Documentacion> {
    return await this.documentacionRepository.findOne({where: {idDocumento: id}, relations: ['documentacionContratos']});
  }

  async remove(id: number) : Promise<any> {
    const documentacion = await this.findOne(id);
    return await this.documentacionRepository.remove(documentacion);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const documentacion = await this.documentacionRepository.findBy({
      idDocumento: In(id)
  });
    return await this.documentacionRepository.remove(documentacion);
  }

  async getTipoDocumento (tipoDocumentoId: number) : Promise<TiposDocumento>{
    return this.tiposDocumentoService.findOne(tipoDocumentoId);
  }
}