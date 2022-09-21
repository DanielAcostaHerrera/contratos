import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacturaDesglose } from 'src/models/entities/FacturaDesglose.entity';
import { In, Repository } from 'typeorm';
import { CreateFacturaDesgloseInput } from './dto/create-factura-desglose.input';

@Injectable()
export class FacturaDesgloseService {
  constructor(@InjectRepository(FacturaDesglose) public readonly facturaDesgloseRepository: Repository<FacturaDesglose>) {}


  async save(createFacturaDesgloseInput: CreateFacturaDesgloseInput) : Promise<FacturaDesglose> {
    return await this.facturaDesgloseRepository.save(createFacturaDesgloseInput);
  }

  async findAll(): Promise<FacturaDesglose[]> {
    return await this.facturaDesgloseRepository.find({relations:['facturaResumen','codigo','referencia','pais']});
  }

  async findOne(id: number) : Promise<FacturaDesglose> {
    return await this.facturaDesgloseRepository.findOne({where: {idFacturaDesglose: id},relations:['facturaResumen','codigo','referencia','pais']});
  }

  async remove(id: number) : Promise<any> {
    const facturaDesglose = await this.findOne(id);
    return await this.facturaDesgloseRepository.remove(facturaDesglose);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const facturaDesglose = await this.facturaDesgloseRepository.findBy({
      idFacturaDesglose: In(id)
  });
    return await this.facturaDesgloseRepository.remove(facturaDesglose);
  }

  async removeSeveralByFacturaId(idFactura: number) : Promise<any> {
    const facturaDesgloses = await this.facturaDesgloseRepository.find({where: {idFactura}});
    return await this.facturaDesgloseRepository.remove(facturaDesgloses);
  }
}
