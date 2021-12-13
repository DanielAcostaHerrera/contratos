import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuplementoClausulasService } from './suplemento-clausulas.service';
import { CreateSuplementoClausulaInput } from './dto/create-suplemento-clausula.input';
import { SuplementoClausulas } from 'src/models/entities/SuplementoClausulas.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { ContratoClausulas } from 'src/models/entities/ContratoClausulas.entity';

@Resolver(() => SuplementoClausulas)
export class SuplementoClausulasResolver {
  constructor(private readonly suplementoClausulasService: SuplementoClausulasService) {}

  @Mutation(() => SuplementoClausulas)
  createSuplementoClausula(@Args('createSuplementoClausulaInput') createSuplementoClausulaInput: CreateSuplementoClausulaInput) {
    return this.suplementoClausulasService.save(createSuplementoClausulaInput);
  }

  @Query(() => [SuplementoClausulas])
  findAllSuplementoClausulas() {
    return this.suplementoClausulasService.findAll();
  }

  @Query(() => SuplementoClausulas)
  findOneSuplementoClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoClausulasService.findOne(id);
  }

  @Mutation(() => SuplementoClausulas)
  removeSuplementoClausula(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoClausulasService.remove(id);
  }

  @ResolveField(() => SuplementoResumen, {nullable: true})
  suplementoResumen(@Parent() suplementoClausulas: SuplementoClausulas): Promise<SuplementoResumen> {
    return this.suplementoClausulasService.getSuplementoResumen(suplementoClausulas.idSuplementoResumen);
  }

  @ResolveField(() => ContratoClausulas, {nullable: true})
  contratoClausulas(@Parent() suplementoClausulas: SuplementoClausulas): Promise<ContratoClausulas> {
    return this.suplementoClausulasService.getContratoClausulas(suplementoClausulas.idContratoClausulas);
  }
}
