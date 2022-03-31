import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Especificos } from 'src/modelsMercurio/entities/Especificos.entity';
import { EspecificosService } from './especificos.service';

@Resolver(() => Especificos)
export class EspecificosResolver {
  constructor(private readonly especificosService: EspecificosService) {}

  @Query(() => [Especificos])
  @UseGuards(new AuthGuard())
  findAllEspecificos() {
    return this.especificosService.findAll();
  }

  @Query(() => Especificos)
  @UseGuards(new AuthGuard())
  findOneEspecifico(@Args('id', { type: () => Int }) id: number) {
    return this.especificosService.findOne(id);
  }
}
