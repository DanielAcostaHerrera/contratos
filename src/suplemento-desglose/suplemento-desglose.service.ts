import { ReferenciasService } from 'src/referencias/referencias.service';
import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { UnidadMedidaService } from 'src/unidad-medida/unidad-medida.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuplementoDesglose } from 'src/models/entities/SuplementoDesglose.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { SuplementoResumenService } from 'src/suplemento-resumen/suplemento-resumen.service';
import { Repository } from 'typeorm';
import { CreateSuplementoDesgloseInput } from './dto/create-suplemento-desglose.input';

@Injectable()
export class SuplementoDesgloseService {
  constructor(@InjectRepository(SuplementoDesglose) public readonly suplementoDesgloseRepository: Repository<SuplementoDesglose>,
  private suplementoResumenService: SuplementoResumenService,
  private unidadMedidaService: UnidadMedidaService, private codigosParaLaVentaService: CodigosParaLaVentaService,
  private referenciasService: ReferenciasService) {}


  async save(createSuplementoDesgloseInput: CreateSuplementoDesgloseInput) : Promise<SuplementoDesglose> {
    return await this.suplementoDesgloseRepository.save(createSuplementoDesgloseInput);
  }

  async findAll(): Promise<SuplementoDesglose[]> {
    return await this.suplementoDesgloseRepository.find();
  }

  async findOne(id: number) : Promise<SuplementoDesglose> {
    return await this.suplementoDesgloseRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    const suplementoDesglose = await this.findOne(id);
    return await this.suplementoDesgloseRepository.remove(suplementoDesglose);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const suplementoDesglose = await this.suplementoDesgloseRepository.findByIds(id);
    return await this.suplementoDesgloseRepository.remove(suplementoDesglose);
  }

  async removeSeveralByEmbarqueIdSuplementoResumenId(idEmbarque: number, idSuplementoResumen: number) : Promise<any> {
    const suplementoDesgloses = await this.suplementoDesgloseRepository.find({where: {idEmbarque,idSuplementoResumen}});
    return await this.suplementoDesgloseRepository.remove(suplementoDesgloses);
  }

  async getSuplementoResumen (id: number) : Promise<SuplementoResumen>{
    return this.suplementoResumenService.findOne(id);
  }

  async getUnidadMedida (id: number) : Promise<UnidadMedida>{
    return this.unidadMedidaService.findOne(id);
  }

  async getCodigo (id: number) : Promise<CodigosParaLaVenta>{
    return this.codigosParaLaVentaService.findOne(id);
  }

  async getReferencia (id: number) : Promise<Referencias>{
    return this.referenciasService.findOne(id);
  }
}
