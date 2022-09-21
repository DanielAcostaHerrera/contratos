import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { SuplementoEmbarquesService } from './suplemento-embarques.service';
import { CreateSuplementoEmbarqueInput } from './dto/create-suplemento-embarque.input';
import { SuplementoEmbarques } from 'src/models/entities/SuplementoEmbarques.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SuplementoEmbarques)
export class SuplementoEmbarquesResolver {
  constructor(private readonly suplementoEmbarquesService: SuplementoEmbarquesService) {}

  @Mutation(() => SuplementoEmbarques)
  @UseGuards(new AuthGuard())
  createSuplementoEmbarque(@Args('createSuplementoEmbarqueInput') createSuplementoEmbarqueInput: CreateSuplementoEmbarqueInput) {
    return this.suplementoEmbarquesService.save(createSuplementoEmbarqueInput);
  }

  @Query(() => [SuplementoEmbarques])
  @UseGuards(new AuthGuard())
  findAllSuplementoEmbarques() {
    return this.suplementoEmbarquesService.findAll();
  }

  @Query(() => SuplementoEmbarques)
  @UseGuards(new AuthGuard())
  findOneSuplementoEmbarques(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoEmbarquesService.findOne(id);
  }

  @Mutation(() => SuplementoEmbarques)
  @UseGuards(new AuthGuard())
  removeSuplementoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoEmbarquesService.remove(id);
  }

  @Mutation(() => [SuplementoEmbarques])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoEmbarque(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoEmbarquesService.removeSeveral(id);
  }
}
