import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { ContratosService } from './contratos.service';
import { CreateContratoInput } from './dto/create-contrato.input';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { UseGuards } from '@nestjs/common';
import { SuplementoChange } from 'src/models/entities/SuplementoChange.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';

@Resolver(() => Contratos)
export class ContratosResolver {
  constructor(private readonly contratosService: ContratosService) {}

  @Mutation(() => Contratos)
  @UseGuards(new AuthGuard())
  createContrato(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('createContratoInput') createContratoInput: CreateContratoInput) {
    return this.contratosService.save(usuario,createContratoInput);
  }

  @Mutation(() => SuplementoResumen)
  @UseGuards(new AuthGuard())
  anadirSuplemento(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('idContrato') idContrato: number) {
    return this.contratosService.anadirSuplemento(usuario,idContrato);
  }

  @Mutation(() => [SuplementoChange])
  @UseGuards(new AuthGuard())
  comprobarDiferencias(
    @Args('idContrato', { type: () => Int }) idContrato: number) {
    return this.contratosService.comprobarDiferencias(idContrato);
  }

  @Query(() => [Contratos])
  @UseGuards(new AuthGuard())
  findAllContratos() {
    return this.contratosService.findAll();
  }

  @Query(() => Contratos)
  @UseGuards(new AuthGuard())
  findOneContratos(@Args('id', { type: () => Int }) id: number) {
    return this.contratosService.findOne(id);
  }

  @Query(() => Contratos)
  @UseGuards(new AuthGuard())
  findOneContratosUltimoSuplementoParaUpdate(@Args('id', { type: () => Int }) id: number) {
    return this.contratosService.findOneUltimoSuplementoParaUpdate(id);
  }

  @Query(() => Contratos)
  @UseGuards(new AuthGuard())
  findOneContratosUltimoSuplemento(@Args('id', { type: () => Int }) id: number) {
    return this.contratosService.findOneUltimoSuplemento(id);
  }

  @Query(() => Contratos)
  @UseGuards(new AuthGuard())
  findOneContratosSuplementoEspecifico(
    @Args('id', { type: () => Int }) id: number,
    @Args('mostrar', { type: () => Int }) mostrar: number,) {
    return this.contratosService.findOneSuplementoEspecifico(id,mostrar);
  }

  @Query(() => [Contratos])
  @UseGuards(new AuthGuard())
  findContratosByIdBaseGeneral(@Args('id', { type: () => Int }) id: number) {
    return this.contratosService.findContratosByIdBaseGeneral(id);
  }

  @Mutation(() => Contratos)
  @UseGuards(new AuthGuard())
  removeContrato(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => Int }) id: number) {
    return this.contratosService.remove(usuario,id);
  }

  @Mutation(() => [Contratos])
  @UseGuards(new AuthGuard())
  removeSeveralContrato(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => [Int] }) id: number[]) {
    return this.contratosService.removeSeveral(usuario,id);
  }
}
