import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
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

@Resolver(() => BasesGenerales)
export class BasesGeneralesResolver {
  constructor(private readonly basesGeneralesService: BasesGeneralesService) {}

  @Mutation(() => BasesGenerales)
  createBasesGenerales(@Args('createBasesGeneraleInput') createBasesGeneraleInput: CreateBasesGeneralesInput) {
    return this.basesGeneralesService.save(createBasesGeneraleInput);
  }

  @Mutation(() => [BasesGeneralesClausulas])
  actualizarClausulasFromBaseGeneral(@Args('idBaseGeneral') idBaseGeneral: number){
    return this.basesGeneralesService.actualizarClausulasFromBaseGeneral(idBaseGeneral);;
  }

  @Query(() => [BasesGenerales])
  findAllBasesGenerales() {
    return this.basesGeneralesService.findAll();
  }

  @Query(() => BasesGenerales)
  findOneBasesGenerales(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesService.findOne(id);
  }

  @Mutation(() => BasesGenerales)
  removeBasesGenerales(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesService.remove(id);
  }

  @Query(() => [BasesGeneralesClausulas])
  getClausulasFromBaseGeneral(
    @Args('idIncoterm', { type: () => Int }) idIncoterm: number,
    @Args('idProveedor', { type: () => Int }) idProveedor: number): Promise<BasesGeneralesClausulas[]>
    {
    return this.basesGeneralesService.getClausulasFromBaseGeneral(idIncoterm,idProveedor);
  }

  @Mutation(() => [BasesGenerales])
  removeSeveralBasesGenerales(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.basesGeneralesService.removeSeveral(id);
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
