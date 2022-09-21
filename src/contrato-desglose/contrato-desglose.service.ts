import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { ReferenciasService } from 'src/referencias/referencias.service';
import { UnidadMedidaService } from 'src/unidad-medida/unidad-medida.service';
import { In, Repository } from 'typeorm';
import { CreateContratoDesgloseInput } from './dto/create-contrato-desglose.input';

@Injectable()
export class ContratoDesgloseService {
  constructor(@InjectRepository(ContratoDesglose) public readonly contratoDesgloseRepository: Repository<ContratoDesglose>) {}


  async save(createContratoDesgloseInput: CreateContratoDesgloseInput) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.save(createContratoDesgloseInput);
  }

  async findAll(): Promise<ContratoDesglose[]> {
    return await this.contratoDesgloseRepository.find({relations:['embarques','referencia','codigo','unidadMedida']});
  }

  async findOne(id: number) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.findOne({where: {idContratoDesglose: id},relations:['embarques','referencia','codigo','unidadMedida']});
  }

  async remove(id: number) : Promise<any> {
    const contratoDesglose = await this.findOne(id);
    return await this.contratoDesgloseRepository.remove(contratoDesglose);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const contratoDesglose = await this.contratoDesgloseRepository.findBy({
      idContratoDesglose: In(id)
  });
    return await this.contratoDesgloseRepository.remove(contratoDesglose);
  }

  async removeSeveralByEmbarqueId(idEmbarque: number) : Promise<any> {
    const contratosDesgloses = await this.contratoDesgloseRepository.find({where: {idEmbarque}});
    return await this.contratoDesgloseRepository.remove(contratosDesgloses);
  }
}
