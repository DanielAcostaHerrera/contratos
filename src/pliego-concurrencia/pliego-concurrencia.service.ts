import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PliegoConcurrencia } from 'src/models/entities/PliegoConcurrencia.entity';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { SolicitudOfertasService } from 'src/solicitud-ofertas/solicitud-ofertas.service';
import { Repository } from 'typeorm';
import { CreatePliegoConcurrenciaInput } from './dto/create-pliego-concurrencia.input';

@Injectable()
export class PliegoConcurrenciaService {
  constructor(@InjectRepository(PliegoConcurrencia) public readonly pliegoConcurrenciaRepository: Repository<PliegoConcurrencia>,
  private solicitudOfertasService: SolicitudOfertasService) {}


  async save(createPliegoConcurrenciaInput: CreatePliegoConcurrenciaInput) : Promise<PliegoConcurrencia> {
    return await this.pliegoConcurrenciaRepository.save(createPliegoConcurrenciaInput);
  }

  async findAll(): Promise<PliegoConcurrencia[]> { 
    return await this.pliegoConcurrenciaRepository.find({relations:['pliegoConcurrenciaResumen']});
  }

  async findOne(id: number) : Promise<PliegoConcurrencia> {
    return await this.pliegoConcurrenciaRepository.findOne(id,{relations:['pliegoConcurrenciaResumen']});
  }

  async remove(id: number) : Promise<any> {
    return await this.pliegoConcurrenciaRepository.delete(id);
  }

  async getOferta (ofertaId: number) : Promise<SolicitudOfertas>{
    return this.solicitudOfertasService.findOne(ofertaId);
  }
}
