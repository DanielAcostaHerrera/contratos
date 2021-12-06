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

  @ResolveField(() => Clasificaciones, {nullable: true})
  clasificaciones(@Parent() clasificaciones: Clasificaciones) {
    return this.basesGeneralesService.getClasificacion(clasificaciones.idClasificacion);
  }

  @ResolveField(() => TipoContrato, {nullable: true})
  tipoDeContrato(@Parent() tipoContrato: TipoContrato) {
    return this.basesGeneralesService.getTipoContrato(tipoContrato.idTipoContrato);
  }

  @ResolveField(() => Incoterm, {nullable: true})
  incoterm(@Parent() incoterm: Incoterm) {
    return this.basesGeneralesService.getIncoterm(incoterm.idIncoterm);
  }

  @ResolveField(() => Proformas, {nullable: true})
  proforma(@Parent() proformas: Proformas) {
    return this.basesGeneralesService.getProforma(proformas.idProforma);
  }

  @ResolveField(() => Compradores, {nullable: true})
  compradores(@Parent() compradores: Compradores) {
    return this.basesGeneralesService.getComprador(compradores.idComprador);
  }
}
