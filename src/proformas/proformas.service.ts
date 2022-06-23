import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { CreateProformaClausulaInput } from 'src/proforma-clausulas/dto/create-proforma-clausula.input';
import { ProformaClausulasService } from 'src/proforma-clausulas/proforma-clausulas.service';
import { TipoContratoService } from 'src/tipo-contrato/tipo-contrato.service';
import { Repository } from 'typeorm';
import { CreateProformaInput } from './dto/create-proforma.input';

@Injectable()
export class ProformasService {
  constructor(@InjectRepository(Proformas) public readonly proformaRepository: Repository<Proformas>,
  private tipoContratoService: TipoContratoService, private incotermService: IncotermService, private proformaClausulaService: ProformaClausulasService) {}

  async save(createProformaInput: CreateProformaInput) : Promise<Proformas> {
    let result: Proformas;

    if(createProformaInput.idProforma){
      result = await this.proformaRepository.save(createProformaInput);

      if(result){
        this.proformaClausulaService.removeSeveralByProformaId(createProformaInput.idProforma);
        let clausulas = createProformaInput.proformaClausulas;
          for (let index = 0; index < clausulas.length; index++) {
            const clausula = clausulas[index];
            
            var proformaClausula = new CreateProformaClausulaInput();
            proformaClausula.idProformaClausula = clausula.idProformaClausula;
            proformaClausula.idProforma = clausula.idProforma;
            proformaClausula.idTipoClausula = clausula.idTipoClausula;
            proformaClausula.orden = clausula.orden;
            proformaClausula.clausula = clausula.clausula;
            
            await this.proformaClausulaService.save(proformaClausula)        
          }
      }
    }
    if(!createProformaInput.idProforma){
      result = await this.proformaRepository.save(createProformaInput);
    }
    return result;
  }

  async findAll(): Promise<Proformas[]> {
    return await this.proformaRepository.find({ relations: ['proformaClausulas','basesGenerales']});
  }

  async findOne(id: number) : Promise<Proformas> {
    return await this.proformaRepository.findOne(id,{ relations: ['proformaClausulas','basesGenerales']});
  }

  async remove(id: number) : Promise<any> {
    const proformas = await this.findOne(id);
    return await this.proformaRepository.remove(proformas);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const proformas = await this.proformaRepository.findByIds(id);
    return await this.proformaRepository.remove(proformas);
  }
  
  async getTipoContrato (tipoContratoId: number) : Promise<TipoContrato>{
    return this.tipoContratoService.findOne(tipoContratoId);
  }

  async getIncoterm (incotermId: number) : Promise<Incoterm>{
    return this.incotermService.findOne(incotermId);
  }
}
