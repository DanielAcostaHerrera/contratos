import { AgenciasAseguradoras } from './../modelsNomgen/entities/AgenciasAseguradoras.entity';
import { CompaniasNavieras } from './../modelsNomgen/entities/CompaniasNavieras.entity';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
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

@Resolver(() => Contratos)
export class ContratosResolver {
  constructor(private readonly contratosService: ContratosService) {}

  @Mutation(() => Contratos)
  createContrato(@Args('createContratoInput') createContratoInput: CreateContratoInput) {
    return this.contratosService.save(createContratoInput);
  }

  @Query(() => [Contratos])
  findAllContratos() {
    return this.contratosService.findAll();
  }

  @Query(() => Contratos)
  findOneContratos(@Args('id', { type: () => Int }) id: number) {
    return this.contratosService.findOne(id);
  }

  @Mutation(() => Contratos)
  removeContrato(@Args('id', { type: () => Int }) id: number) {
    return this.contratosService.remove(id);
  }

  @Mutation(() => [Contratos])
  removeSeveralContrato(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.contratosService.removeSeveral(id);
  }

  @ResolveField(() => BasesGenerales, {nullable: true})
  basesGenerales(@Parent() contratos: Contratos): Promise<BasesGenerales> {
    return this.contratosService.getBasesGenerales(contratos.idBasesGenerales);
  }

  @ResolveField(() => BasesCMarco, {nullable: true})
  baseCMarco(@Parent() contratos: Contratos): Promise<BasesCMarco> {
    return this.contratosService.getBasesCMarco(contratos.idBaseCMarco);
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

  @ResolveField(() => Paises, {nullable: true})
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
}
