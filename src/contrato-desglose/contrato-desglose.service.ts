import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { EmbarquesService } from 'src/embarques/embarques.service';
import { ContratoDesglose } from 'src/models/entities/ContratoDesglose.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { ReferenciasService } from 'src/referencias/referencias.service';
import { UnidadMedidaService } from 'src/unidad-medida/unidad-medida.service';
import { Repository } from 'typeorm';
import { CreateContratoDesgloseInput } from './dto/create-contrato-desglose.input';

@Injectable()
export class ContratoDesgloseService {
  constructor(@InjectRepository(ContratoDesglose) public readonly contratoDesgloseRepository: Repository<ContratoDesglose>,private embarquesService: EmbarquesService,
  private referenciasService: ReferenciasService,private unidadMedidaService: UnidadMedidaService,private codigosParaLaVentaService: CodigosParaLaVentaService) {}


  async save(createContratoDesgloseInput: CreateContratoDesgloseInput) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.save(createContratoDesgloseInput);
  }

  async findAll(): Promise<ContratoDesglose[]> {
    return await this.contratoDesgloseRepository.find();
  }

  async findOne(id: number) : Promise<ContratoDesglose> {
    return await this.contratoDesgloseRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const contratoDesglose = await this.findOne(id);
    return await this.contratoDesgloseRepository.remove(contratoDesglose);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const contratoDesglose = await this.contratoDesgloseRepository.findByIds(id);
    return await this.contratoDesgloseRepository.remove(contratoDesglose);
  }

  async getEmbarque (Id: number) : Promise<Embarques>{
    return this.embarquesService.findOne(Id);
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
}
