import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiposDeComprasService } from './tipos-de-compras.service';
import { CreateTiposDeCompraInput } from './dto/create-tipos-de-compra.input';
import { TiposDeCompras } from 'src/models/entities/TiposDeCompras.entity';

@Resolver(() => TiposDeCompras)
export class TiposDeComprasResolver {
  constructor(private readonly tiposDeComprasService: TiposDeComprasService) {}

  @Mutation(() => TiposDeCompras)
  createTiposDeCompras(@Args('createTiposDeCompraInput') createTiposDeCompraInput: CreateTiposDeCompraInput) {
    return this.tiposDeComprasService.save(createTiposDeCompraInput);
  }

  @Query(() => [TiposDeCompras])
  findAllTiposDeCompras() {
    return this.tiposDeComprasService.findAll();
  }

  @Query(() => TiposDeCompras)
  findOneTiposDeCompras(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDeComprasService.findOne(id);
  }

  @Mutation(() => TiposDeCompras)
  removeTiposDeCompras(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDeComprasService.remove(id);
  }
}
