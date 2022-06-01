import { AgenciasAseguradoras } from './../modelsNomgen/entities/AgenciasAseguradoras.entity';
import { CompaniasNavieras } from './../modelsNomgen/entities/CompaniasNavieras.entity';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { FichaCostoResumen } from 'src/models/entities/FichaCostoResumen.entity';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { ContratosService } from './contratos.service';
import { CreateContratoInput } from './dto/create-contrato.input';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { UseGuards } from '@nestjs/common';
import { ContratoMarco } from 'src/models/entities/ContratoMarco.entity';

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
  baseCMarco(@Parent() contratos: Contratos): Promise<ContratoMarco> {
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

  @ResolveField(() => FichaCostoResumen, {nullable: true})
  fichaCostoResumen(@Parent() contratos: Contratos): Promise<FichaCostoResumen> {
    return this.contratosService.getFichaCostoResumen(contratos.idFichaCosto);
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

  @ResolveField(() => Paises, {nullable: true})
  pais(@Parent() contratos: Contratos): Promise<Paises> {
    return this.contratosService.getPais(contratos.idPais);
  }

  @ResolveField(() => Proveedores, {nullable: true})
  proveedor(@Parent() contratos: Contratos): Promise<Proveedores> {
    return this.contratosService.getProveedor(contratos.idProveedor);
  }

  @ResolveField(() => CompaniasNavieras, {nullable: true})
  companiaNaviera(@Parent() contratos: Contratos): Promise<CompaniasNavieras> {
    return this.contratosService.getEmpresaNaviera(contratos.idEmpresaNaviera);
  }

  @ResolveField(() => AgenciasAseguradoras, {nullable: true})
  agenciaAseguradora(@Parent() contratos: Contratos): Promise<AgenciasAseguradoras> {
    return this.contratosService.getEmpresaAseguradora(contratos.idEmpresaSeguro);
  }

  @ResolveField(() => Incoterm, {nullable: true})
  incoterm(@Parent() contratos: Contratos): Promise<Incoterm> {
    return this.contratosService.getIncoterm(contratos.idIncoterm);
  }
}
