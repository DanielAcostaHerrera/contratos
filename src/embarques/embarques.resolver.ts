import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { EmbarquesService } from './embarques.service';
import { CreateEmbarqueInput } from './dto/create-embarque.input';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';

@Resolver(() => Embarques)
export class EmbarquesResolver {
  constructor(private readonly embarquesService: EmbarquesService) {}

  @Mutation(() => Embarques)
  @UseGuards(new AuthGuard())
  createEmbarque(
    @Args('createEmbarqueInput') createEmbarqueInput: CreateEmbarqueInput) {
    return this.embarquesService.save(createEmbarqueInput);
  }

  @Query(() => [Embarques])
  @UseGuards(new AuthGuard())
  findAllEmbarques() {
    return this.embarquesService.findAll();
  }

  @Query(() => Embarques)
  @UseGuards(new AuthGuard())
  findOneEmbarques(@Args('id', { type: () => Int }) id: number) {
    return this.embarquesService.findOne(id);
  }

  @Query(() => [Embarques])
  @UseGuards(new AuthGuard())
  findEmbarquesByIdContrato(@Args('id', { type: () => Int }) id: number) {
    return this.embarquesService.findEmbarquesByIdContrato(id);
  }

  @Mutation(() => Embarques)
  @UseGuards(new AuthGuard())
  removeEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.embarquesService.remove(id);
  }

  @Mutation(() => [Embarques])
  @UseGuards(new AuthGuard())
  removeSeveralEmbarque(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.embarquesService.removeSeveral(id);
  }

  @ResolveField(() => CompaniasNavieras, {nullable: true})
  companiaNaviera(@Parent() embarques: Embarques): Promise<CompaniasNavieras> {
    return this.embarquesService.getCompaniaNaviera(embarques.idEmpresaNaviera);
  }
}
