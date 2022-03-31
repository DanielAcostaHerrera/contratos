import { Proveedores } from './../modelsMercurio/entities/Proveedores.entity';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { BasesCmarcoService } from './bases-cmarco.service';
import { CreateBasesCmarcoInput } from './dto/create-bases-cmarco.input';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => BasesCMarco)
export class BasesCmarcoResolver {
  constructor(private readonly basesCmarcoService: BasesCmarcoService) {}

  @Mutation(() => BasesCMarco)
  @UseGuards(new AuthGuard())
  createBasesCmarco(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('createBasesCmarcoInput') createBasesCmarcoInput: CreateBasesCmarcoInput) {
    return this.basesCmarcoService.save(usuario,createBasesCmarcoInput);
  }

  @Query(() => [BasesCMarco])
  @UseGuards(new AuthGuard())
  findAllBaseCMarco() {
    return this.basesCmarcoService.findAll();
  }

  @Query(() => BasesCMarco)
  @UseGuards(new AuthGuard())
  findOneBaseCMarco(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoService.findOne(id);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puerto(@Parent() basesCMarco: BasesCMarco): Promise<Puertos> {
    return this.basesCmarcoService.getPuerto(basesCMarco.idPuerto);
  }

  @ResolveField(() => Proformas, {nullable: true})
  proforma(@Parent() basesCMarco: BasesCMarco): Promise<Proformas> {
    return this.basesCmarcoService.getProforma(basesCMarco.idProforma);
  }

  @ResolveField(() => Compradores, {nullable: true})
  comprador(@Parent() basesCMarco: BasesCMarco): Promise<Compradores> {
    return this.basesCmarcoService.getComprador(basesCMarco.idComprador);
  }

  @ResolveField(() => BasesGenerales, {nullable: true})
  basesGenerales(@Parent() basesCMarco: BasesCMarco): Promise<BasesGenerales> {
    return this.basesCmarcoService.getBasesGenerales(basesCMarco.idBasesGenerales);
  }

  @ResolveField(() => Proveedores, {nullable: true})
  proveedor(@Parent() basesCMarco: BasesCMarco): Promise<Proveedores> {
    return this.basesCmarcoService.getProveedor(basesCMarco.idProveedor);
  }

  @Mutation(() => BasesCMarco)
  @UseGuards(new AuthGuard())
  removeBasesCmarco(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoService.remove(usuario,id);
  }

  @Mutation(() => [BasesCMarco])
  @UseGuards(new AuthGuard())
  removeSeveralBasesCmarco(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => [Int] }) id: number[]) {
    return this.basesCmarcoService.removeSeveral(usuario,id);
  }
}
