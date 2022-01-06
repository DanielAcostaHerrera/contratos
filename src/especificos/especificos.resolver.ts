import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Especificos } from 'src/modelsMercurio/entities/Especificos.entity';
import { EspecificosService } from './especificos.service';

@Resolver(() => Especificos)
export class EspecificosResolver {
  constructor(private readonly especificosService: EspecificosService) {}

  @Query(() => [Especificos])
  findAllEspecificos() {
    return this.especificosService.findAll();
  }

  @Query(() => Especificos)
  findOneEspecifico(@Args('id', { type: () => Int }) id: number) {
    return this.especificosService.findOne(id);
  }
}
