import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Contratos } from 'src/models/entities/Contratos.entity';
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
}
