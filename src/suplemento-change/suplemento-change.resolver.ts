import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SuplementoChangeService } from './suplemento-change.service';
import { CreateSuplementoChangeInput } from './dto/create-suplemento-change.input';
import { SuplementoChange } from 'src/models/entities/SuplementoChange.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SuplementoChange)
export class SuplementoChangeResolver {
  constructor(private readonly suplementoChangeService: SuplementoChangeService) {}

  @Mutation(() => SuplementoChange)
  @UseGuards(new AuthGuard())
  createSuplementoChange(@Args('createSuplementoChangeInput') createSuplementoChangeInput: CreateSuplementoChangeInput) {
    return this.suplementoChangeService.save(createSuplementoChangeInput);
  }

  @Query(() => [SuplementoChange])
  @UseGuards(new AuthGuard())
  findAllSuplementoChange() {
    return this.suplementoChangeService.findAll();
  }

  @Query(() => SuplementoChange)
  @UseGuards(new AuthGuard())
  findOneSuplementoChange(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoChangeService.findOne(id);
  }

  @Mutation(() => SuplementoChange)
  @UseGuards(new AuthGuard())
  removeSuplementoChange(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoChangeService.remove(id);
  }

  @Mutation(() => [SuplementoChange])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoChange(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoChangeService.removeSeveral(id);
  }
}
