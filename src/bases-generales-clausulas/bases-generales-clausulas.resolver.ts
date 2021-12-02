import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasesGeneralesClausulasService } from './bases-generales-clausulas.service';
import { CreateBasesGeneralesClausulaInput } from './dto/create-bases-generales-clausula.input';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';

@Resolver(() => BasesGeneralesClausulas)
export class BasesGeneralesClausulasResolver {
  constructor(private readonly basesGeneralesClausulasService: BasesGeneralesClausulasService) {}

  @Mutation(() => BasesGeneralesClausulas)
  createBasesGeneralesClausula(@Args('createBasesGeneralesClausulaInput') createBasesGeneralesClausulaInput: CreateBasesGeneralesClausulaInput) {
    return this.basesGeneralesClausulasService.save(createBasesGeneralesClausulaInput);
  }

  @Query(() => [BasesGeneralesClausulas])
  findAllBasesGeneralesClausulas() {
    return this.basesGeneralesClausulasService.findAll();
  }

  @Query(() => BasesGeneralesClausulas)
  findOneBasesGeneralesClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesClausulasService.findOne(id);
  }

  @Mutation(() => BasesGeneralesClausulas)
  removeBasesGeneralesClausula(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesClausulasService.remove(id);
  }
}
