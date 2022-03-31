import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmbalajesService } from './Embalajes.service';
import { Embalajes } from '../models/entities/Embalajes.entity';
import { CreateEmbalajeInput } from './dto/create-embalaje.input';
import { clearConfigCache } from 'prettier';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';


@Resolver(() => Embalajes)
export class EmbalajesResolver {
  constructor(private readonly embalajesService: EmbalajesService) {}

  @Mutation(() => Embalajes)
  @UseGuards(new AuthGuard())
  createEmbalajes(@Args('createEmbalajeInput') createEmbalajeInput: CreateEmbalajeInput) {
    return this.embalajesService.save(createEmbalajeInput);
  }

  @Query(() => [Embalajes])
  @UseGuards(new AuthGuard())
  findAllEmbalajes() {
    return this.embalajesService.findAll();
  }

  @Query(() => Embalajes)
  @UseGuards(new AuthGuard())
  findOneEmbalajes(
    @Args('id', { type: () => Int }) id: number) {
    return this.embalajesService.findOne(id);
  }

  @Mutation(() => Embalajes)
  @UseGuards(new AuthGuard())
  removeEmbalajes(@Args('id', { type: () => Int }) id: number) {
    return this.embalajesService.remove(id);
  }

  @Mutation(() => [Embalajes])
  @UseGuards(new AuthGuard())
  removeSeveralEmbalajes(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.embalajesService.removeSeveral(id);
  }
}
