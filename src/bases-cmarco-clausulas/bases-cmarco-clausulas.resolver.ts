import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasesCmarcoClausulasService } from './bases-cmarco-clausulas.service';
import { BasesCMarcoClausulas } from 'src/models/entities/BasesCMarcoClausulas.entity';
import { CreateBasesCmarcoClausulaInput } from './dto/create-bases-cmarco-clausula.input';

@Resolver(() => BasesCMarcoClausulas)
export class BasesCmarcoClausulasResolver {
  constructor(private readonly basesCmarcoClausulasService: BasesCmarcoClausulasService) {}

  @Mutation(() => BasesCMarcoClausulas)
  createBasesCmarcoClausula(@Args('createBasesCmarcoClausulaInput') createBasesCmarcoClausulaInput: CreateBasesCmarcoClausulaInput) {
    return this.basesCmarcoClausulasService.save(createBasesCmarcoClausulaInput);
  }

  @Query(() => [BasesCMarcoClausulas])
  findAllBasesCMarcoClausula() {
    return this.basesCmarcoClausulasService.findAll();
  }

  @Query(() => BasesCMarcoClausulas)
  findOneBasesCMarcoClausula(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoClausulasService.findOne(id);
  }

  @Mutation(() => BasesCMarcoClausulas)
  removeBasesCmarcoClausula(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoClausulasService.remove(id);
  }
}
