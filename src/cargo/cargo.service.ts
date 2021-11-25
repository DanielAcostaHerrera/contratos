import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargos } from 'src/models/entities/Cargos.entity';
import { Repository } from 'typeorm';
import { CreateCargoInput } from './dto/create-cargo.input';

@Injectable()
export class CargoService {
  constructor(@InjectRepository(Cargos) public readonly cargoRepository: Repository<Cargos>) {}


  async save(createCargoInput: CreateCargoInput) : Promise<Cargos> {
    return await this.cargoRepository.save(createCargoInput);
  }

  async findAll(): Promise<Cargos[]> {
    return await this.cargoRepository.find();
  }

  async findOne(id: number) : Promise<Cargos> {
    return await this.cargoRepository.findOne(id);
  }

  async remove(id: number) : Promise<any> {
    return await this.cargoRepository.delete(id);
  }
}
