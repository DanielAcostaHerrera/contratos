import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiposDeClausulasService } from './tipos-de-clausulas.service';
import { CreateTiposDeClausulaInput } from './dto/create-tipos-de-clausula.input';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';

@Resolver(() => TiposDeClausulas)
export class TiposDeClausulasResolver {
  constructor(private readonly tiposDeClausulasService: TiposDeClausulasService) {}

  @Mutation(() => TiposDeClausulas)
  createTiposDeClausulas(@Args('createTiposDeClausulaInput') createTiposDeClausulaInput: CreateTiposDeClausulaInput) {
    return this.tiposDeClausulasService.save(createTiposDeClausulaInput);
  }

  @Query(() => [TiposDeClausulas])
  findAllTiposDeClausulas() {
    return this.tiposDeClausulasService.findAll();
  }

  @Query(() => TiposDeClausulas)
  findOneTiposDeClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDeClausulasService.findOne(id);
  }

  @Mutation(() => TiposDeClausulas)
  removeTiposDeClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDeClausulasService.remove(id);
  }
}
