import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SuplementoDesgloseService } from './suplemento-desglose.service';
import { CreateSuplementoDesgloseInput } from './dto/create-suplemento-desglose.input';
import { SuplementoDesglose } from 'src/models/entities/SuplementoDesglose.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SuplementoDesglose)
export class SuplementoDesgloseResolver {
  constructor(private readonly suplementoDesgloseService: SuplementoDesgloseService) {}

  @Mutation(() => SuplementoDesglose)
  @UseGuards(new AuthGuard())
  createSuplementoDesglose(@Args('createSuplementoDesgloseInput') createSuplementoDesgloseInput: CreateSuplementoDesgloseInput) {
    return this.suplementoDesgloseService.save(createSuplementoDesgloseInput);
  }

  @Query(() => [SuplementoDesglose])
  @UseGuards(new AuthGuard())
  findAllSuplementoDesglose() {
    return this.suplementoDesgloseService.findAll();
  }

  @Query(() => SuplementoDesglose)
  @UseGuards(new AuthGuard())
  findOneSuplementoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoDesgloseService.findOne(id);
  }

  @Mutation(() => SuplementoDesglose)
  @UseGuards(new AuthGuard())
  removeSuplementoDesglose(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoDesgloseService.remove(id);
  }

  @Mutation(() => [SuplementoDesglose])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoDesglose(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoDesgloseService.removeSeveral(id);
  }
}
