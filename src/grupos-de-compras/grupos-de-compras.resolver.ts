import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GruposDeComprasService } from './grupos-de-compras.service';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { CreateGruposDeCompraInput } from './dto/create-grupos-de-compra.input';

@Resolver(() => GruposDeCompras)
export class GruposDeComprasResolver {
  constructor(private readonly gruposDeComprasService: GruposDeComprasService) {}

  @Mutation(() => GruposDeCompras)
  createGruposDeCompra(@Args('createGruposDeCompraInput') createGruposDeCompraInput: CreateGruposDeCompraInput) {
    return this.gruposDeComprasService.save(createGruposDeCompraInput);
  }

  @Query(() => [GruposDeCompras])
  findAllGrupos() {
    return this.gruposDeComprasService.findAll();
  }

  @Query(() => GruposDeCompras)
  findOneGrupo(@Args('id', { type: () => Int }) id: number) {
    return this.gruposDeComprasService.findOne(id);
  }

  @Mutation(() => GruposDeCompras)
  removeGruposDeCompra(@Args('id', { type: () => Int }) id: number) {
    return this.gruposDeComprasService.remove(id);
  }
}
