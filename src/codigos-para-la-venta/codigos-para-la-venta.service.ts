import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { In } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CodigosParaLaVentaService {
  constructor(@InjectRepository(CodigosParaLaVenta) public readonly codigosParaLaVentaRepository: Repository<CodigosParaLaVenta>) {}

  async findAll(): Promise<CodigosParaLaVenta[]> {
    return await this.codigosParaLaVentaRepository.find();
  }

  async findOne(id: number) : Promise<CodigosParaLaVenta> {
    return await this.codigosParaLaVentaRepository.findOne({where: {idCodigo: id},});
  }

  async findByListaCodigos(filename: string) : Promise<CodigosParaLaVenta[]> {
    let listaCodigos: string[] = await this.getCodigosFromExcel(filename)
    let codigos: CodigosParaLaVenta[] = []
    for(let i = 0; i < listaCodigos.length; i++){
      codigos.push(await this.codigosParaLaVentaRepository.findOne({ where: {codigo: listaCodigos[i].toString().padStart(13,"0") }}))
    }
    return codigos;
  }

  async getCodigosFromExcel(filename: string) : Promise<string[]> {
    const xlsxFile = require('read-excel-file/node');
    let codigos: string[] = []
 
    let rows = await xlsxFile(filename, { sheet: 'Hoja1' })
    for(let i = 0; i < rows.length; i++){
        for (let j = 0; j < rows[i].length; j++){
            codigos.push(rows[i][j])
        }
    }
    return codigos;
  }
}
