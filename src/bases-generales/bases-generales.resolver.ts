import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { BasesGeneralesService } from './bases-generales.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { CreateBasesGeneralesInput } from './dto/create-bases-generales.input';
import { Clasificaciones } from 'src/models/entities/Clasificaciones.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { StreamableFile, UseGuards } from '@nestjs/common';

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

  @Query(() => [BasesGenerales])
  @UseGuards(new AuthGuard())
  findAllBasesGenerales() {
    return this.basesGeneralesService.findAll();
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

  @UseGuards(new AuthGuard())
  getFileBaseGeneral(){
    return this.basesGeneralesService.getFile();
  }

  @ResolveField(() => TipoContrato, {nullable: true})
  tipoDeContrato(@Parent() basesGenerales: BasesGenerales): Promise<TipoContrato> {
    return this.basesGeneralesService.getTipoContrato(basesGenerales.idTipoContrato);
  }

  @ResolveField(() => Incoterm, {nullable: true})
  incoterm(@Parent() basesGenerales: BasesGenerales): Promise<Incoterm> {
    return this.basesGeneralesService.getIncoterm(basesGenerales.idIncoterm);
  }

  @ResolveField(() => Proformas, {nullable: true})
  proforma(@Parent() basesGenerales: BasesGenerales): Promise<Proformas> {
    return this.basesGeneralesService.getProforma(basesGenerales.idProforma);
  }

  @ResolveField(() => Compradores, {nullable: true})
  compradores(@Parent() basesGenerales: BasesGenerales): Promise<Compradores> {
    return this.basesGeneralesService.getComprador(basesGenerales.idComprador);
  }

  @ResolveField(() => Paises, {nullable: true})
  pais(@Parent() basesGenerales: BasesGenerales): Promise<Paises> {
    return this.basesGeneralesService.getPais(basesGenerales.idPais);
  }

  @ResolveField(() => Proveedores, {nullable: true})
  proveedor(@Parent() basesGenerales: BasesGenerales): Promise<Proveedores> {
    return this.basesGeneralesService.getProveedor(basesGenerales.idProveedor);
  }
}
