import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { NegociacionResumenService } from './negociacion-resumen.service';
import { CreateNegociacionResumenInput } from './dto/create-negociacion-resumen.input';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { TiposDeCompras } from 'src/models/entities/TiposDeCompras.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => NegociacionResumen)
export class NegociacionResumenResolver {
  constructor(private readonly negociacionResumenService: NegociacionResumenService) {}

  @Mutation(() => NegociacionResumen)
  @UseGuards(new AuthGuard())
  createNegociacionResumen(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('createNegociacionResumenInput') createNegociacionResumenInput: CreateNegociacionResumenInput) {
    return this.negociacionResumenService.save(usuario,createNegociacionResumenInput);
  }

  @Query(() => [NegociacionResumen])
  @UseGuards(new AuthGuard())
  findAllNegociacionResumen() {
    return this.negociacionResumenService.findAll();
  }

  @Query(() => NegociacionResumen)
  @UseGuards(new AuthGuard())
  findOneNegociacionResumen(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionResumenService.findOne(id);
  }

  @Mutation(() => NegociacionResumen)
  @UseGuards(new AuthGuard())
  removeNegociacionResumen(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => Int }) id: number) {
    return this.negociacionResumenService.remove(usuario,id);
  }

  @Mutation(() => [NegociacionResumen])
  @UseGuards(new AuthGuard())
  removeSeveralNegociacionResumen(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => [Int] }) id: number[]) {
    return this.negociacionResumenService.removeSeveral(usuario,id);
  }

  @ResolveField(() => GruposDeCompras, {nullable: true})
  grupos(@Parent() negociacionResumen: NegociacionResumen): Promise<GruposDeCompras> {
    return this.negociacionResumenService.getGrupo(negociacionResumen.idGrupo);
  }

  @ResolveField(() => Monedas, {nullable: true})
  monedas(@Parent() negociacionResumen: NegociacionResumen): Promise<Monedas> {
    return this.negociacionResumenService.getMoneda(negociacionResumen.idMoneda);
  }

  @ResolveField(() => TiposDeCompras, {nullable: true})
  tiposDeCompras(@Parent() negociacionResumen: NegociacionResumen): Promise<TiposDeCompras> {
    return this.negociacionResumenService.getTipoCompra(negociacionResumen.idTipoCompras);
  }
}
