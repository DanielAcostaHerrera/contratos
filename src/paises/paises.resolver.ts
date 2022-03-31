import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { PaisesService } from './paises.service';

@Resolver(() => Paises)
export class PaisesResolver {
  constructor(private readonly paisesService: PaisesService) {}

  @Query(() => [Paises])
  @UseGuards(new AuthGuard())
  findAllPaises() {
    return this.paisesService.findAll();
  }

  @Query(() => Paises)
  @UseGuards(new AuthGuard())
  findOnePaises(@Args('id', { type: () => Int }) id: number) {
    return this.paisesService.findOne(id);
  }

}
