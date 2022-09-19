import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { In } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CodigosParaLaVentaService {
  constructor(@InjectRepository(CodigosParaLaVenta) public readonly codigosParaLaVentaRepository: Repository<CodigosParaLaVenta>) {}

  async findAll(): Promise<CodigosParaLaVenta[]> {
    return await this.codigosParaLaVentaRepository.find({relations: ['embalaje','referencia']});
  }

  async findOne(id: number) : Promise<CodigosParaLaVenta> {
    return new Promise<CodigosParaLaVenta>(async (resolve, reject) => {
      const codigo = await this.codigosParaLaVentaRepository.findOne({where: {idCodigo: id},relations: ['embalaje','referencia']});
      if(!codigo){
        reject('El codigo con id '+ id +' no existe');
      }
      else{ 
        resolve(codigo); 
      }
    });
  }
}
