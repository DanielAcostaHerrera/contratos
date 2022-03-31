import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { ProveedoresService } from './proveedores.service';

@Resolver(() => Proveedores)
export class ProveedoresResolver {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Query(() => [Proveedores])
  @UseGuards(new AuthGuard())
  findAllProveedores() {
    return this.proveedoresService.findAll();
  }

  @Query(() => Proveedores)
  @UseGuards(new AuthGuard())
  findOneProveedor(@Args('id', { type: () => Int }) id: number) {
    return this.proveedoresService.findOne(id);
  }
}
