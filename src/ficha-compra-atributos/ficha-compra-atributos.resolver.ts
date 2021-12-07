import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FichaCompraAtributosService } from './ficha-compra-atributos.service';
import { CreateFichaCompraAtributoInput } from './dto/create-ficha-compra-atributo.input';
import { FichaCompraAtributos } from 'src/models/entities/FichaCompraAtributos.entity';
import { FichaCompraDetalle } from 'src/models/entities/FichaCompraDetalle.entity';

@Resolver(() => FichaCompraAtributos)
export class FichaCompraAtributosResolver {
  constructor(private readonly fichaCompraAtributosService: FichaCompraAtributosService) {}

  @Mutation(() => FichaCompraAtributos)
  createFichaCompraAtributos(@Args('createFichaCompraAtributoInput') createFichaCompraAtributoInput: CreateFichaCompraAtributoInput) {
    return this.fichaCompraAtributosService.save(createFichaCompraAtributoInput);
  }

  @Query(() => [FichaCompraAtributos])
  findAllFichaCompraAtributos() {
    return this.fichaCompraAtributosService.findAll();
  }

  @Query(() => FichaCompraAtributos)
  findOneFichaCompraAtributos(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraAtributosService.findOne(id);
  }

  @Mutation(() => FichaCompraAtributos)
  removeFichaCompraAtributos(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraAtributosService.remove(id);
  }

  @ResolveField(() => FichaCompraDetalle, {nullable: true})
  fichaCompraDetalle(@Parent() fichaCompraDetalle: FichaCompraDetalle) {
    return this.fichaCompraAtributosService.getFichaCompraDetalle(fichaCompraDetalle.idFichaCompraDetalle);
  }
}
