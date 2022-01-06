import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { ProveedoresService } from './proveedores.service';

@Resolver(() => Proveedores)
export class ProveedoresResolver {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Query(() => [Proveedores])
  findAllProveedores() {
    return this.proveedoresService.findAll();
  }

  @Query(() => Proveedores)
  findOneProveedor(@Args('id', { type: () => Int }) id: number) {
    return this.proveedoresService.findOne(id);
  }
}
