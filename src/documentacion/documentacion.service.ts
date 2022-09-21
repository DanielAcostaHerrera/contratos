import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentacion } from 'src/models/entities/Documentacion.entity';
import { In, Repository } from 'typeorm';
import { CreateDocumentacionInput } from './dto/create-documentacion.input';

@Injectable()
export class DocumentacionService {
  constructor(@InjectRepository(Documentacion) public readonly documentacionRepository: Repository<Documentacion>) {}


  async save(createDocumentacionInput: CreateDocumentacionInput) : Promise<Documentacion> {
    return await this.documentacionRepository.save(createDocumentacionInput);
  }

  async findAll(): Promise<Documentacion[]> {
    return await this.documentacionRepository.find({ relations: ['documentacionContratos','tiposDocumento']});
  }

  async findOne(id: number) : Promise<Documentacion> {
    return await this.documentacionRepository.findOne({where: {idDocumento: id}, relations: ['documentacionContratos','tiposDocumento']});
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
}