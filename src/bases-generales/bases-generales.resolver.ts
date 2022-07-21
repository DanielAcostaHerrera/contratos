import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { BasesGeneralesService } from './bases-generales.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { CreateBasesGeneralesInput } from './dto/create-bases-generales.input';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { StreamableFile, UseGuards } from '@nestjs/common';
import { FilterBasesGeneralesInput } from './dto/filter-bases-generales.input';
import { CountBasesGenerales } from './dto/count-bases-generales.input';

@Resolver(() => BasesGenerales)
export class BasesGeneralesResolver {
  constructor(private readonly basesGeneralesService: BasesGeneralesService) {}

  @Mutation(() => BasesGenerales)
  @UseGuards(new AuthGuard())
  createBasesGenerales(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('createBasesGeneraleInput') createBasesGeneraleInput: CreateBasesGeneralesInput) {
    return this.basesGeneralesService.save(usuario,createBasesGeneraleInput);
  }

  @Query(() => [BasesGeneralesClausulas])
  @UseGuards(new AuthGuard())
  actualizarClausulasFromBaseGeneral(@Args('idBaseGeneral') idBaseGeneral: number){
    return this.basesGeneralesService.actualizarClausulasFromBaseGeneral(idBaseGeneral);
  }

  @Query(() => CountBasesGenerales)
  @UseGuards(new AuthGuard())
  countBasesGenerales(
    @Args('where', { type: () => FilterBasesGeneralesInput, nullable: true }) where: FilterBasesGeneralesInput) {
    return this.basesGeneralesService.countBasesGenerales(where);
  }
  
  @Query(() => [BasesGenerales])
  @UseGuards(new AuthGuard())
  findAllBasesGenerales(
    @Args('take', { type: () => Int, nullable: true }) take: number,
    @Args('skip', { type: () => Int, nullable: true }) skip: number) {
    return this.basesGeneralesService.findAll(take,skip);
  }

  @Query(() => BasesGenerales)
  @UseGuards(new AuthGuard())
  findOneBasesGenerales(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesService.findOne(id);
  }

  @Mutation(() => BasesGenerales)
  @UseGuards(new AuthGuard())
  removeBasesGenerales(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesService.remove(usuario,id);
  }

  @Query(() => [BasesGeneralesClausulas])
  @UseGuards(new AuthGuard())
  getClausulasFromBaseGeneral(
    @Args('idIncoterm', { type: () => Int }) idIncoterm: number,
    @Args('idProveedor', { type: () => Int }) idProveedor: number): Promise<BasesGeneralesClausulas[]>
    {
    return this.basesGeneralesService.getClausulasFromBaseGeneral(idIncoterm,idProveedor);
  }

  @Mutation(() => [BasesGenerales])
  @UseGuards(new AuthGuard())
  removeSeveralBasesGenerales(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => [Int] }) id: number[]) {
    return this.basesGeneralesService.removeSeveral(usuario,id);
  }
}
