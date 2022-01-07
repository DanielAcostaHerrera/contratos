import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuplementoChangeService } from './suplemento-change.service';
import { CreateSuplementoChangeInput } from './dto/create-suplemento-change.input';
import { SuplementoChange } from 'src/models/entities/SuplementoChange.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';

@Resolver(() => SuplementoChange)
export class SuplementoChangeResolver {
  constructor(private readonly suplementoChangeService: SuplementoChangeService) {}

  @Mutation(() => SuplementoChange)
  createSuplementoChange(@Args('createSuplementoChangeInput') createSuplementoChangeInput: CreateSuplementoChangeInput) {
    return this.suplementoChangeService.save(createSuplementoChangeInput);
  }

  @Query(() => [SuplementoChange])
  findAllSuplementoChange() {
    return this.suplementoChangeService.findAll();
  }

  @Query(() => SuplementoChange)
  findOneSuplementoChange(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoChangeService.findOne(id);
  }

  @Mutation(() => SuplementoChange)
  removeSuplementoChange(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoChangeService.remove(id);
  }

  @Mutation(() => [SuplementoChange])
  removeSeveralSuplementoChange(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoChangeService.removeSeveral(id);
  }

  @ResolveField(() => SuplementoResumen, {nullable: true})
  suplementoResumen(@Parent() suplementoChange: SuplementoChange): Promise<SuplementoResumen> {
    return this.suplementoChangeService.getSuplementoResumen(suplementoChange.idSuplementoResumen);
  }

  @ResolveField(() => ContratoClausulas, {nullable: true})
  contratoClausulas(@Parent() suplementoChange: SuplementoChange): Promise<ContratoClausulas> {
    return this.suplementoChangeService.getContratoClausulas(suplementoChange.idContratoClausula);
  }

  @ResolveField(() => Embarques, {nullable: true})
  embarques(@Parent() suplementoChange: SuplementoChange): Promise<Embarques> {
    return this.suplementoChangeService.getEmbarque(suplementoChange.idEmbarque);
  }
}