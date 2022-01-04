import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { BasesGeneralesService } from './bases-generales.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { CreateBasesGeneralesInput } from './dto/create-bases-generales.input';
import { Clasificaciones } from 'src/models/entities/Clasificaciones.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';

@Resolver(() => BasesGenerales)
export class BasesGeneralesResolver {
  constructor(private readonly basesGeneralesService: BasesGeneralesService) {}

  @Mutation(() => BasesGenerales)
  createBasesGenerales(@Args('createBasesGeneraleInput') createBasesGeneraleInput: CreateBasesGeneralesInput) {
    return this.basesGeneralesService.save(createBasesGeneraleInput);
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

  @Mutation(() => [BasesGenerales])
  removeSeveralBasesGenerales(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.basesGeneralesService.removeSeveral(id);
  }

  @ResolveField(() => Clasificaciones, {nullable: true})
  clasificaciones(@Parent() basesGenerales: BasesGenerales): Promise<Clasificaciones> {
    return this.basesGeneralesService.getClasificacion(basesGenerales.idClasificacion);
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
}
