import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiposDeClausulasService } from './tipos-de-clausulas.service';
import { CreateTiposDeClausulaInput } from './dto/create-tipos-de-clausula.input';
import { TiposDeClausulas } from 'src/models/entities/TiposDeClausulas.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => TiposDeClausulas)
export class TiposDeClausulasResolver {
  constructor(private readonly tiposDeClausulasService: TiposDeClausulasService) {}

  @Mutation(() => TiposDeClausulas)
  @UseGuards(new AuthGuard())
  createTiposDeClausulas(@Args('createTiposDeClausulaInput') createTiposDeClausulaInput: CreateTiposDeClausulaInput) {
    return this.tiposDeClausulasService.save(createTiposDeClausulaInput);
  }

  @Query(() => [TiposDeClausulas])
  @UseGuards(new AuthGuard())
  findAllTiposDeClausulas() {
    return this.tiposDeClausulasService.findAll();
  }

  @Query(() => TiposDeClausulas)
  @UseGuards(new AuthGuard())
  findOneTiposDeClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDeClausulasService.findOne(id);
  }

  @Mutation(() => TiposDeClausulas)
  @UseGuards(new AuthGuard())
  removeTiposDeClausulas(@Args('id', { type: () => Int }) id: number) {
    return this.tiposDeClausulasService.remove(id);
  }

  @Mutation(() => [TiposDeClausulas])
  @UseGuards(new AuthGuard())
  removeSeveralTiposDeClausulas(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.tiposDeClausulasService.removeSeveral(id);
  }
}
