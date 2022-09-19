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

  async findByListaCodigos(listaCodigos: string[], idProveedor: number) : Promise<Referencias[]> {
    let referencias: Referencias[] = []
    for(let i = 0; i < listaCodigos.length; i++){
      try{
        referencias.push(await this.referenciasRepository.findOne({ where: {referencia: listaCodigos[i].toString(), proveedorRef: idProveedor},relations:['codigo','codigo.embalaje.']}))
      }
      catch (err) { 
        console.log(err) 
      };
    }
    return referencias;
  }
}
