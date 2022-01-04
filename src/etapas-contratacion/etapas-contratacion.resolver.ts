import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EtapasContratacionService } from './etapas-contratacion.service';
import { CreateEtapasContratacionInput } from './dto/create-etapas-contratacion.input';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';

@Resolver(() => EtapasContratacion)
export class EtapasContratacionResolver {
  constructor(private readonly etapasContratacionService: EtapasContratacionService) {}

  @Mutation(() => EtapasContratacion)
  createEtapasContratacion(@Args('createEtapasContratacionInput') createEtapasContratacionInput: CreateEtapasContratacionInput) {
    return this.etapasContratacionService.save(createEtapasContratacionInput);
  }

  @Query(() => [EtapasContratacion])
  findAllEtapasContratacion() {
    return this.etapasContratacionService.findAll();
  }

  @Query(() => EtapasContratacion)
  findOneEtapasContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.etapasContratacionService.findOne(id);
  }

  @Mutation(() => EtapasContratacion)
  removeEtapasContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.etapasContratacionService.remove(id);
  }

  @Mutation(() => [EtapasContratacion])
  removeSeveralEtapasContratacion(@Args('id', { type: () => [Int]}) id: number[]) {
    return this.etapasContratacionService.removeSeveral(id);
  }
}
