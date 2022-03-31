import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FichaCompraAtributosService } from './ficha-compra-atributos.service';
import { CreateFichaCompraAtributoInput } from './dto/create-ficha-compra-atributo.input';
import { FichaCompraAtributos } from 'src/models/entities/FichaCompraAtributos.entity';
import { FichaCompraDetalle } from 'src/models/entities/FichaCompraDetalle.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => FichaCompraAtributos)
export class FichaCompraAtributosResolver {
  constructor(private readonly fichaCompraAtributosService: FichaCompraAtributosService) {}

  @Mutation(() => FichaCompraAtributos)
  @UseGuards(new AuthGuard())
  createFichaCompraAtributos(@Args('createFichaCompraAtributoInput') createFichaCompraAtributoInput: CreateFichaCompraAtributoInput) {
    return this.fichaCompraAtributosService.save(createFichaCompraAtributoInput);
  }

  @Query(() => [FichaCompraAtributos])
  @UseGuards(new AuthGuard())
  findAllFichaCompraAtributos() {
    return this.fichaCompraAtributosService.findAll();
  }

  @Query(() => FichaCompraAtributos)
  @UseGuards(new AuthGuard())
  findOneFichaCompraAtributos(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraAtributosService.findOne(id);
  }

  @Mutation(() => FichaCompraAtributos)
  @UseGuards(new AuthGuard())
  removeFichaCompraAtributos(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraAtributosService.remove(id);
  }

  @Mutation(() => [FichaCompraAtributos])
  @UseGuards(new AuthGuard())
  removeSeveralFichaCompraAtributos(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.fichaCompraAtributosService.removeSeveral(id);
  }

  @ResolveField(() => FichaCompraDetalle, {nullable: true})
  fichaCompraDetalle(@Parent() fichaCompraAtributos: FichaCompraAtributos): Promise<FichaCompraDetalle> {
    return this.fichaCompraAtributosService.getFichaCompraDetalle(fichaCompraAtributos.idFichaCompraDetalle);
  }
}
