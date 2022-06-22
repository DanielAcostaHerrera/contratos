import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuplementoClausulasService } from './suplemento-clausulas.service';
import { CreateSuplementoClausulaInput } from './dto/create-suplemento-clausula.input';
import { SuplementoClausulas } from 'src/models/entities/SuplementoClausulas.entity';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SuplementoClausulas)
export class SuplementoClausulasResolver {
  constructor(private readonly suplementoClausulasService: SuplementoClausulasService) {}

  @Mutation(() => SuplementoClausulas)
  @UseGuards(new AuthGuard())
  createSuplementoClausula(@Args('createSuplementoClausulaInput') createSuplementoClausulaInput: CreateSuplementoClausulaInput) {
    return this.suplementoClausulasService.save(createSuplementoClausulaInput);
  }

  @Query(() => [SuplementoClausulas])
  @UseGuards(new AuthGuard())
  findAllSuplementoClausulas() {
    return this.suplementoClausulasService.findAll();
  }

  @Query(() => SuplementoClausulas)
  @UseGuards(new AuthGuard())
  findOneSuplementoClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoClausulasService.findOne(id);
  }

  @Mutation(() => SuplementoClausulas)
  @UseGuards(new AuthGuard())
  removeSuplementoClausula(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoClausulasService.remove(id);
  }

  @Mutation(() => [SuplementoClausulas])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoClausula(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoClausulasService.removeSeveral(id);
  }

  @ResolveField(() => SuplementoResumen, {nullable: true})
  suplementoResumen(@Parent() suplementoClausulas: SuplementoClausulas): Promise<SuplementoResumen> {
    return this.suplementoClausulasService.getSuplementoResumen(suplementoClausulas.idSuplementoResumen);
  }
}
