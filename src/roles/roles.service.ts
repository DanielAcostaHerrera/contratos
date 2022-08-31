import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/models/entities/Roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) public readonly rolesRepository: Repository<Roles>) {}

  async save(createRoleInput: CreateRoleInput) : Promise<Roles> {
    return await this.rolesRepository.save(createRoleInput);
  }

  async findAll(): Promise<Roles[]> {
    return await this.rolesRepository.find({ relations: ['usuarioRoles']});
  }

  async findOne(id: number) : Promise<Roles> {
    return await this.rolesRepository.findOne({where: {idRol: id}, relations: ['usuarioRoles']});
  }

  async remove(id: number) : Promise<any> {
    const roles = await this.findOne(id);
    return await this.rolesRepository.remove(roles);
  }

  async removeSeveral(id: number[]) : Promise<any> {
    const roles = await this.rolesRepository.findByIds(id);
    return await this.rolesRepository.remove(roles);
  }
}
