import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
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

  @ResolveField(() => BasesGenerales, {nullable: true})
  basesGenerales(@Parent() contratos: Contratos): Promise<BasesGenerales> {
    return this.contratosService.getBasesGenerales(contratos.idBasesGenerales);
  }
  
  @ResolveField(() => TipoContrato, {nullable: true})
  tipoContrato(@Parent() contratos: Contratos): Promise<TipoContrato> {
    return this.contratosService.getTipoContrato(contratos.idTipoContrato);
  }

  @ResolveField(() => Proformas, {nullable: true})
  proformas(@Parent() contratos: Contratos): Promise<Proformas> {
    return this.contratosService.getProforma(contratos.idProforma);
  }
}
