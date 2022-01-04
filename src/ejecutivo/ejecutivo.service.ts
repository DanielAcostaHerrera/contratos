import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CargoService } from 'src/cargo/cargo.service';
import { GruposDeComprasService } from 'src/grupos-de-compras/grupos-de-compras.service';
import { Cargos } from 'src/models/entities/Cargos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { Repository } from 'typeorm';
import { CreateEjecutivoInput } from './dto/create-ejecutivo.input';

@Injectable()
export class EjecutivoService {
  constructor(@InjectRepository(Ejecutivos) public readonly ejecutivosRepository: Repository<Ejecutivos>,
  private cargoService: CargoService,private gruposDeComprasService: GruposDeComprasService) {}


  async save(createEjecutivoInput: CreateEjecutivoInput) : Promise<Ejecutivos> {
    return await this.ejecutivosRepository.save(createEjecutivoInput);
  }

  async findAll(): Promise<Ejecutivos[]> {
    return await this.ejecutivosRepository.find({relations:['contratosRealiza','contratosFirma','contratosModifica','embarques','facturaResumen','facturaResumenRealiza',
    'suplementoResumenSuplementa','suplementoResumen','suplementoResumenFirma','usuarios']});
  }

  async findOne(id: number) : Promise<Ejecutivos> {
    return await this.ejecutivosRepository.findOne(id,{relations:['contratosRealiza','contratosFirma','contratosModifica','embarques','facturaResumen','facturaResumenRealiza',
    'suplementoResumenSuplementa','suplementoResumen','suplementoResumenFirma','usuarios']});
  }

  async remove(id: number) : Promise<any> {
    const ejecutivos = await this.findOne(id);
    return await this.ejecutivosRepository.remove(ejecutivos);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const ejecutivos = await this.ejecutivosRepository.findByIds(id);
    return await this.ejecutivosRepository.remove(ejecutivos);
  }

  async getCargo (cargoId: number) : Promise<Cargos>{
    return this.cargoService.findOne(cargoId);
  }

  async getGrupo (grupoId: number) : Promise<GruposDeCompras>{
    return this.gruposDeComprasService.findOne(grupoId);
  }
}
