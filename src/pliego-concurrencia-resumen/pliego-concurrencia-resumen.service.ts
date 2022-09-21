import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { In, Repository } from 'typeorm';
import { CreatePliegoConcurrenciaResumanInput } from './dto/create-pliego-concurrencia-resuman.input';

@Injectable()
export class PliegoConcurrenciaResumenService {
  constructor(@InjectRepository(PliegoConcurrenciaResumen) public readonly pliegoConcurrenciaResumenRepository: Repository<PliegoConcurrenciaResumen>) {}


  async save(createPliegoConcurrenciaResumanInput: CreatePliegoConcurrenciaResumanInput) : Promise<PliegoConcurrenciaResumen> {
    return await this.pliegoConcurrenciaResumenRepository.save(createPliegoConcurrenciaResumanInput);
  }

  async findAll(): Promise<PliegoConcurrenciaResumen[]> { 
    return await this.pliegoConcurrenciaResumenRepository.find({relations:['pliegoConcurrenciaDetalles','solicitudCodificacion','pliegoConcurrencia','monedaOferta',
  'monedaPago','monedaCartaCredito','incoterm','formaPago','formaEntrega','puertoEmbarque','puertoDestino','tipoContenedor','proveedor','paisOrigenMercancia',
  'naviera']});
  }

  async findOne(id: number) : Promise<PliegoConcurrenciaResumen> {
    return await this.pliegoConcurrenciaResumenRepository.findOne({where: {idPliegoResumen: id},relations:['pliegoConcurrenciaDetalles','solicitudCodificacion'
    ,'pliegoConcurrencia','monedaOferta','monedaPago','monedaCartaCredito','incoterm','formaPago','formaEntrega','puertoEmbarque','puertoDestino','tipoContenedor'
    ,'proveedor','paisOrigenMercancia','naviera']});
  }

  async remove(id: number) : Promise<any> {
    const pliegoConcurrenciaResumen = await this.findOne(id);
    return await this.pliegoConcurrenciaResumenRepository.remove(pliegoConcurrenciaResumen);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const pliegoConcurrenciaResumen = await this.pliegoConcurrenciaResumenRepository.findBy({
      idPliegoResumen: In(id)
  });
    return await this.pliegoConcurrenciaResumenRepository.remove(pliegoConcurrenciaResumen);
  }
}
