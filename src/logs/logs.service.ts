import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logs } from 'src/models/entities/Logs.entity';
import { MyLogger } from 'src/MyLogger';
import { In, Repository } from 'typeorm';
import { CreateLogInput } from './dto/create-log.input';

@Injectable()
export class LogsService {
  constructor(@InjectRepository(Logs) public readonly logsRepository: Repository<Logs>) {}

  async save(usuarioLog: string, mensajeLog: string) : Promise<Logs> {
    var createLogInput = new CreateLogInput();
    createLogInput.mensaje = mensajeLog;
    createLogInput.usuario = usuarioLog;
    createLogInput.fecha = MyLogger.getDate();
    return await this.logsRepository.save(createLogInput);
  }

  async findAll(): Promise<Logs[]> {
    return await this.logsRepository.find();
  }

  async findOne(id: number) : Promise<Logs> {
    return await this.logsRepository.findOne({where: {idLog: id},});
  }

  async remove(id: number) : Promise<any> {
    const logs = await this.findOne(id);
    return await this.logsRepository.remove(logs);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const logs = await this.logsRepository.findBy({
      idLog: In(id)
  });
    return await this.logsRepository.remove(logs);
  }
}
