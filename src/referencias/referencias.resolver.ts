import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { ReferenciasService } from './referencias.service';

@Resolver(() => Referencias)
export class ReferenciasResolver {
  constructor(private readonly referenciasService: ReferenciasService) {}

  @Query(() => [Referencias])
  @UseGuards(new AuthGuard())
  findAllReferencias() {
    return this.referenciasService.findAll();
  }

  @Query(() => Referencias)
  @UseGuards(new AuthGuard())
  findOneReferencias(@Args('id', { type: () => Int }) id: number) {
    return this.referenciasService.findOne(id);
  }
}
