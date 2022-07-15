import { CompaniasNavieras } from './../modelsNomgen/entities/CompaniasNavieras.entity';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { ContratosService } from './contratos.service';
import { CreateContratoInput } from './dto/create-contrato.input';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { UseGuards } from '@nestjs/common';
import { ContratoMarco } from 'src/models/entities/ContratoMarco.entity';
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

  @ResolveField(() => BasesGenerales, {nullable: true})
  basesGenerales(@Parent() contratos: Contratos): Promise<BasesGenerales> {
    return this.contratosService.getBasesGenerales(contratos.idBasesGenerales);
  }

  @ResolveField(() => ContratoMarco, {nullable: true})
  contratoMarco(@Parent() contratos: Contratos): Promise<ContratoMarco> {
    return this.contratosService.getCMarco(contratos.idCMarco);
  }

  @ResolveField(() => Monedas, {nullable: true})
  moneda(@Parent() contratos: Contratos): Promise<Monedas> {
    return this.contratosService.getMoneda(contratos.idMoneda);
  }

  @ResolveField(() => FormasEntrega, {nullable: true})
  formaEntrega(@Parent() contratos: Contratos): Promise<FormasEntrega> {
    return this.contratosService.getFormaEntrega(contratos.idFormaEntrega);
  }

  @ResolveField(() => NegociacionResumen, {nullable: true})
  negociacionResumen(@Parent() contratos: Contratos): Promise<NegociacionResumen> {
    return this.contratosService.getNegociacionResumen(contratos.idNegociacion);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivo(@Parent() contratos: Contratos): Promise<Ejecutivos> {
    return this.contratosService.getEjecutivoRealiza(contratos.idEjecutivo);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivoRealiza(@Parent() contratos: Contratos): Promise<Ejecutivos> {
    return this.contratosService.getEjecutivoRealiza(contratos.realizadoPor);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivoFirma(@Parent() contratos: Contratos): Promise<Ejecutivos> {
    return this.contratosService.getEjecutivoFirma(contratos.firmadoPor);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivoModifica(@Parent() contratos: Contratos): Promise<Ejecutivos> {
    return this.contratosService.getEjecutivoModifica(contratos.modificadoPor);
  }


  @ResolveField(() => CompaniasNavieras, {nullable: true})
  companiaNaviera(@Parent() contratos: Contratos): Promise<CompaniasNavieras> {
    return this.contratosService.getEmpresaNaviera(contratos.idEmpresaNaviera);
  }

  @ResolveField(() => Incoterm, {nullable: true})
  incoterm(@Parent() contratos: Contratos): Promise<Incoterm> {
    return this.contratosService.getIncoterm(contratos.idIncoterm);
  }
}
