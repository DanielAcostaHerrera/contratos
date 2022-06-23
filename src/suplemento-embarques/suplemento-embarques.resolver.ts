import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuplementoEmbarquesService } from './suplemento-embarques.service';
import { CreateSuplementoEmbarqueInput } from './dto/create-suplemento-embarque.input';
import { SuplementoEmbarques } from 'src/models/entities/SuplementoEmbarques.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { Contratos } from 'src/models/entities/Contratos.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CompaniasNavieras } from 'src/modelsNomgen/entities/CompaniasNavieras.entity';

@Resolver(() => SuplementoEmbarques)
export class SuplementoEmbarquesResolver {
  constructor(private readonly suplementoEmbarquesService: SuplementoEmbarquesService) {}

  @Mutation(() => SuplementoEmbarques)
  @UseGuards(new AuthGuard())
  createSuplementoEmbarque(@Args('createSuplementoEmbarqueInput') createSuplementoEmbarqueInput: CreateSuplementoEmbarqueInput) {
    return this.suplementoEmbarquesService.save(createSuplementoEmbarqueInput);
  }

  @Query(() => [SuplementoEmbarques])
  @UseGuards(new AuthGuard())
  findAllSuplementoEmbarques() {
    return this.suplementoEmbarquesService.findAll();
  }

  @Query(() => SuplementoEmbarques)
  @UseGuards(new AuthGuard())
  findOneSuplementoEmbarques(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoEmbarquesService.findOne(id);
  }

  @Mutation(() => SuplementoEmbarques)
  @UseGuards(new AuthGuard())
  removeSuplementoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoEmbarquesService.remove(id);
  }

  @Mutation(() => [SuplementoEmbarques])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoEmbarque(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoEmbarquesService.removeSeveral(id);
  }

  @ResolveField(() => SuplementoResumen, {nullable: true})
  suplementoResumen(@Parent() suplementoEmbarques: SuplementoEmbarques): Promise<SuplementoResumen> {
    return this.suplementoEmbarquesService.getSuplementoResumen(suplementoEmbarques.idSuplementoResumen);
  }

  @ResolveField(() => CompaniasNavieras, {nullable: true})
  companiaNaviera(@Parent() suplementoEmbarques: SuplementoEmbarques): Promise<CompaniasNavieras> {
    return this.suplementoEmbarquesService.getNaviera(suplementoEmbarques.idEmpresaNaviera);
  }
}
