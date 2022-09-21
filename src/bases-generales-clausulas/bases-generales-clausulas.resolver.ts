import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasesGeneralesClausulasService } from './bases-generales-clausulas.service';
import { CreateBasesGeneralesClausulaInput } from './dto/create-bases-generales-clausula.input';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => BasesGeneralesClausulas)
export class BasesGeneralesClausulasResolver {
  constructor(private readonly basesGeneralesClausulasService: BasesGeneralesClausulasService) {}

  @Mutation(() => BasesGeneralesClausulas)
  @UseGuards(new AuthGuard())
  createBasesGeneralesClausula(@Args('createBasesGeneralesClausulaInput') createBasesGeneralesClausulaInput: CreateBasesGeneralesClausulaInput) {
    return this.basesGeneralesClausulasService.save(createBasesGeneralesClausulaInput);
  }

  @Query(() => [BasesGeneralesClausulas])
  @UseGuards(new AuthGuard())
  findAllBasesGeneralesClausulas() {
    return this.basesGeneralesClausulasService.findAll();
  }

  @Query(() => BasesGeneralesClausulas)
  @UseGuards(new AuthGuard())
  findOneBasesGeneralesClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesClausulasService.findOne(id);
  }

  @Mutation(() => BasesGeneralesClausulas)
  @UseGuards(new AuthGuard())
  removeBasesGeneralesClausula(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesClausulasService.remove(id);
  }

  @Mutation(() => [BasesGeneralesClausulas])
  @UseGuards(new AuthGuard())
  removeSeveralBasesGeneralesClausula(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.basesGeneralesClausulasService.removeSeveral(id);
  }

  @Mutation(() => [BasesGeneralesClausulas])
  @UseGuards(new AuthGuard())
  removeSeveralBasesGeneralesClausulaByBaseGeneralId(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesClausulasService.removeSeveralByBaseGeneralId(id);
  }
}
