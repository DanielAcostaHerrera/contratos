import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { ReferenciasService } from 'src/referencias/referencias.service';
import { UnidadMedidaService } from 'src/unidad-medida/unidad-medida.service';
import { Repository } from 'typeorm';
import { CreateContratoDesgloseInput } from './dto/create-contrato-desglose.input';

@Injectable()
export class ContratoDesgloseService {
  constructor(@InjectRepository(ContratoDesglose) public readonly contratoDesgloseRepository: Repository<ContratoDesglose>,
  private referenciasService: ReferenciasService,private unidadMedidaService: UnidadMedidaService,private codigosParaLaVentaService: CodigosParaLaVentaService) {}


  async save(createContratoDesgloseInput: CreateContratoDesgloseInput) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.save(createContratoDesgloseInput);
  }

  async findAll(): Promise<ContratoDesglose[]> {
    return await this.contratoDesgloseRepository.find({relations:['embarques']});
  }

  async findOne(id: number) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.findOne({where: {idContratoDesglose: id},relations:['embarques']});
  }

  async remove(id: number) : Promise<any> {
    const contratoDesglose = await this.findOne(id);
    return await this.contratoDesgloseRepository.remove(contratoDesglose);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const contratoDesglose = await this.contratoDesgloseRepository.findByIds(id);
    return await this.contratoDesgloseRepository.remove(contratoDesglose);
  }

  async getReferencia (Id: number) : Promise<Referencias>{
    return this.referenciasService.findOne(Id);
  }

  async getUnidadMedida (Id: number) : Promise<UnidadMedida>{
    return this.unidadMedidaService.findOne(Id);
  }

  async getCodigo (Id: number) : Promise<CodigosParaLaVenta>{
    return this.codigosParaLaVentaService.findOne(Id);
  }

  async removeSeveralByEmbarqueId(idEmbarque: number) : Promise<any> {
    const contratosDesgloses = await this.contratoDesgloseRepository.find({where: {idEmbarque}});
    return await this.contratoDesgloseRepository.remove(contratosDesgloses);
  }
}
