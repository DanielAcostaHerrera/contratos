import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { ReferenciasService } from './referencias.service';

@Resolver(() => Referencias)
export class ReferenciasResolver {
  constructor(private readonly referenciasService: ReferenciasService) {}

  @Query(() => [Referencias])
  findAllReferencias() {
    return this.referenciasService.findAll();
  }

  @Query(() => Referencias)
  findOneReferencias(@Args('id', { type: () => Int }) id: number) {
    return this.referenciasService.findOne(id);
  }
}
