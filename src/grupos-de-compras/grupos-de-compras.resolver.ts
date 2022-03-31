import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GruposDeComprasService } from './grupos-de-compras.service';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { CreateGruposDeCompraInput } from './dto/create-grupos-de-compra.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => GruposDeCompras)
export class GruposDeComprasResolver {
  constructor(private readonly gruposDeComprasService: GruposDeComprasService) {}

  @Mutation(() => GruposDeCompras)
  @UseGuards(new AuthGuard())
  createGruposDeCompra(@Args('createGruposDeCompraInput') createGruposDeCompraInput: CreateGruposDeCompraInput) {
    return this.gruposDeComprasService.save(createGruposDeCompraInput);
  }

  @Query(() => [GruposDeCompras])
  @UseGuards(new AuthGuard())
  findAllGrupos() {
    return this.gruposDeComprasService.findAll();
  }

  @Query(() => GruposDeCompras)
  @UseGuards(new AuthGuard())
  findOneGrupo(@Args('id', { type: () => Int }) id: number) {
    return this.gruposDeComprasService.findOne(id);
  }

  @Mutation(() => GruposDeCompras)
  @UseGuards(new AuthGuard())
  removeGruposDeCompra(@Args('id', { type: () => Int }) id: number) {
    return this.gruposDeComprasService.remove(id);
  }

  @Mutation(() => [GruposDeCompras])
  @UseGuards(new AuthGuard())
  removeSeveralGruposDeCompra(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.gruposDeComprasService.removeSeveral(id);
  }
}
