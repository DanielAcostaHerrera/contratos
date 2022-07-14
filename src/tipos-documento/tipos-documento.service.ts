import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposDocumento } from 'src/models/entities/TiposDocumento.entity';
import { Repository } from 'typeorm';
import { CreateTiposDocumentoInput } from './dto/create-tipos-documento.input';


@Injectable()
export class TiposDocumentoService {
  constructor(@InjectRepository(TiposDocumento) public readonly tiposDocumentoRepository: Repository<TiposDocumento>) {}


  async save(createTiposDocumentoInput: CreateTiposDocumentoInput) : Promise<TiposDocumento> {
    return await this.tiposDocumentoRepository.save(createTiposDocumentoInput);
  }

  async findAll(): Promise<TiposDocumento[]> {
    return await this.tiposDocumentoRepository.find();
  }

  async findOne(id: number) : Promise<TiposDocumento> {
    return await this.tiposDocumentoRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const tiposDocumento = await this.findOne(id);
    return await this.tiposDocumentoRepository.remove(tiposDocumento);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const tiposDocumento = await this.tiposDocumentoRepository.findByIds(id);
    return await this.tiposDocumentoRepository.remove(tiposDocumento);
  }
}
  