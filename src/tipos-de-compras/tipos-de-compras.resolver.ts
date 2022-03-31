import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiposDeComprasService } from './tipos-de-compras.service';
import { CreateTiposDeCompraInput } from './dto/create-tipos-de-compra.input';
import { TiposDeCompras } from 'src/models/entities/TiposDeCompras.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => TiposDeCompras)
export class TiposDeComprasResolver {
  constructor(private readonly tiposDeComprasService: TiposDeComprasService) {}

  @Mutation(() => TiposDeCompras)
  @UseGuards(new AuthGuard())
  createTiposDeCompras(@Args('createTiposDeCompraInput') createTiposDeCompraInput: CreateTiposDeCompraInput) {
    return this.tiposDeComprasService.save(createTiposDeCompraInput);
  }

  @Query(() => [TiposDeCompras])
  @UseGuards(new AuthGuard())
  findAllTiposDeCompras() {
    return this.tiposDeComprasService.findAll();
  }

  @Query(() => TiposDeCompras)
  @UseGuards(new AuthGuard())
  findOneTiposDeCompras(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDeComprasService.findOne(id);
  }

  @Mutation(() => TiposDeCompras)
  @UseGuards(new AuthGuard())
  removeTiposDeCompras(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDeComprasService.remove(id);
  }

  @Mutation(() => [TiposDeCompras])
  @UseGuards(new AuthGuard())
  removeSeveralTiposDeCompras(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.tiposDeComprasService.removeSeveral(id);
  }
}
