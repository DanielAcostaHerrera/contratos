import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SuplementoResumenService } from './suplemento-resumen.service';
import { CreateSuplementoResumanInput } from './dto/create-suplemento-resuman.input';
import { SuplementoResumen } from 'src/models/entities/SuplementoResumen.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SuplementoResumen)
export class SuplementoResumenResolver {
  constructor(private readonly suplementoResumenService: SuplementoResumenService) {}

  @Mutation(() => SuplementoResumen)
  @UseGuards(new AuthGuard())
  createSuplementoResuman(@Args('createSuplementoResumanInput') createSuplementoResumanInput: CreateSuplementoResumanInput) {
    return this.suplementoResumenService.save(createSuplementoResumanInput);
  }

  @Query(() => [SuplementoResumen])
  @UseGuards(new AuthGuard())
  findAllSuplementoResumen() {
    return this.suplementoResumenService.findAll();
  }

  @Query(() => SuplementoResumen)
  @UseGuards(new AuthGuard())
  findOneSuplementoResumen(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoResumenService.findOne(id);
  }

  @Mutation(() => SuplementoResumen)
  @UseGuards(new AuthGuard())
  removeSuplementoResuman(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoResumenService.remove(id);
  }

  @Mutation(() => [SuplementoResumen])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoResuman(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoResumenService.removeSeveral(id);
  }
}
