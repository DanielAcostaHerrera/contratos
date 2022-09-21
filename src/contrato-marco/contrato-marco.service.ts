import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContratoMarco } from '../models/entities/ContratoMarco.entity';
import { In, Repository } from 'typeorm';
import { CreateContratoMarcoInput } from './dto/create-contrato-marco.input';

@Injectable()
export class ContratoMarcoService {
  constructor(@InjectRepository(ContratoMarco) public readonly contratoMarcoRepository: Repository<ContratoMarco>) {}

  async save(createContratoMarcoInput: CreateContratoMarcoInput) : Promise<ContratoMarco> {
    var today = new Date();
    var result: ContratoMarco;

    if(createContratoMarcoInput.idCMarco){
      createContratoMarcoInput.actualizado = new Date();
      createContratoMarcoInput.pendiente = createContratoMarcoInput.monto - createContratoMarcoInput.contratado;
      result = await this.contratoMarcoRepository.save(createContratoMarcoInput);
    }

    if(!createContratoMarcoInput.idCMarco){
      var contratosAnteriores = await this.findAll();
      var ultimoContrato = contratosAnteriores[0];
     
      if(ultimoContrato.fecha.getFullYear() === today.getFullYear() && ultimoContrato.idProveedor == createContratoMarcoInput.idProveedor){
        createContratoMarcoInput.consecutivo = ultimoContrato.consecutivo+1;    
      }
      else{
        createContratoMarcoInput.consecutivo = 1;
      }

      createContratoMarcoInput.creado = new Date();
      createContratoMarcoInput.actualizado = new Date();
      createContratoMarcoInput.pendiente = createContratoMarcoInput.monto - createContratoMarcoInput.contratado;
      result = await this.contratoMarcoRepository.save(createContratoMarcoInput);
    }

    return result;
  }

  async findAll(): Promise<ContratoMarco[]> {
    return await this.contratoMarcoRepository.find({order: {
      fecha : "DESC"
    }, relations: ['contratos','proveedor']});
  }

  async findOne(id: number) : Promise<ContratoMarco> {
    return await this.contratoMarcoRepository.findOne({where: {idCMarco: id}, relations: ['contratos','proveedor']});
  }

  async remove(id: number) : Promise<any> {
    const documentacion = await this.findOne(id);
    return await this.contratoMarcoRepository.remove(documentacion);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const contratoMarco = await this.contratoMarcoRepository.findBy({
      idCMarco: In(id)
  });
    return await this.contratoMarcoRepository.remove(contratoMarco);
  }
}
