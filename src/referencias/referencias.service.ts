import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { ImportExcel } from 'src/streaming/importExcel';
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

  async findByListaCodigos(listaCodigos: ImportExcel[], idProveedor: number) : Promise<Referencias[]> {
    let referencias: Referencias[] = []
    for(let i = 0; i < listaCodigos.length; i++){
      try{
        let importExcel = listaCodigos[i]
        let referencia = await this.referenciasRepository.findOne({ where: {referencia: importExcel.codigo.toString(), proveedorRef: idProveedor},relations:['codigo','codigo.embalaje']})
        if(importExcel.precio != null){
          referencia.codigo.precioProveedor = importExcel.precio
        }
        referencias.push(referencia)
      }
      catch (err) { 
        console.log(err) 
      };
    }
    return referencias;
  }
}
