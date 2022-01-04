import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmbalajesService } from './Embalajes.service';
import { Embalajes } from '../models/entities/Embalajes.entity';
import { CreateEmbalajeInput } from './dto/create-embalaje.input';
import { clearConfigCache } from 'prettier';


@Resolver(() => Embalajes)
export class EmbalajesResolver {
  constructor(private readonly embalajesService: EmbalajesService) {}

  @Mutation(() => Embalajes)
  createEmbalajes(@Args('createEmbalajeInput') createEmbalajeInput: CreateEmbalajeInput) {
    return this.embalajesService.save(createEmbalajeInput);
  }

  @Query(() => [Embalajes])
  findAllEmbalajes() {
    return this.embalajesService.findAll();
  }

  @Query(() => Embalajes)
  findOneEmbalajes(
    @Args('id', { type: () => Int }) id: number) {
    return this.embalajesService.findOne(id);
  }

  @Mutation(() => Embalajes)
  removeEmbalajes(@Args('id', { type: () => Int }) id: number) {
    return this.embalajesService.remove(id);
  }

  @Mutation(() => [Embalajes])
  removeSeveralEmbalajes(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.embalajesService.removeSeveral(id);
  }
}
