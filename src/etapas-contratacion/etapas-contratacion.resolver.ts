import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EtapasContratacionService } from './etapas-contratacion.service';
import { CreateEtapasContratacionInput } from './dto/create-etapas-contratacion.input';
import { EtapasContratacion } from 'src/models/entities/EtapasContratacion.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => EtapasContratacion)
export class EtapasContratacionResolver {
  constructor(private readonly etapasContratacionService: EtapasContratacionService) {}

  @Mutation(() => EtapasContratacion)
  @UseGuards(new AuthGuard())
  createEtapasContratacion(@Args('createEtapasContratacionInput') createEtapasContratacionInput: CreateEtapasContratacionInput) {
    return this.etapasContratacionService.save(createEtapasContratacionInput);
  }

  @Query(() => [EtapasContratacion])
  @UseGuards(new AuthGuard())
  findAllEtapasContratacion() {
    return this.etapasContratacionService.findAll();
  }

  @Query(() => EtapasContratacion)
  @UseGuards(new AuthGuard())
  findOneEtapasContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.etapasContratacionService.findOne(id);
  }

  @Mutation(() => EtapasContratacion)
  @UseGuards(new AuthGuard())
  removeEtapasContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.etapasContratacionService.remove(id);
  }

  @Mutation(() => [EtapasContratacion])
  @UseGuards(new AuthGuard())
  removeSeveralEtapasContratacion(@Args('id', { type: () => [Int]}) id: number[]) {
    return this.etapasContratacionService.removeSeveral(id);
  }
}
