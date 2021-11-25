import { Injectable } from '@nestjs/common';
import { CreateEjecutivoInput } from './dto/create-ejecutivo.input';
import { UpdateEjecutivoInput } from './dto/update-ejecutivo.input';

@Injectable()
export class EjecutivoService {
  create(createEjecutivoInput: CreateEjecutivoInput) {
    return 'This action adds a new ejecutivo';
  }

  findAll() {
    return `This action returns all ejecutivo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ejecutivo`;
  }

  update(id: number, updateEjecutivoInput: UpdateEjecutivoInput) {
    return `This action updates a #${id} ejecutivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ejecutivo`;
  }
}
