import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { PaisesService } from './paises.service';

@Resolver(() => Paises)
export class PaisesResolver {
  constructor(private readonly paisesService: PaisesService) {}

  @Query(() => [Paises])
  findAllPaises() {
    return this.paisesService.findAll();
  }

  @Query(() => Paises)
  findOnePaises(@Args('id', { type: () => Int }) id: number) {
    return this.paisesService.findOne(id);
  }

}
