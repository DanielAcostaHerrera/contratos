import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Campanas } from 'src/models/entities/Campanas.entity';
import { CampanasService } from './campanas.service';
import { CreateCampanaInput } from './dto/create-campana.input';

@Resolver(() => Campanas)
export class CampanasResolver {
  constructor(private readonly campanasService: CampanasService) {}

  @Mutation(() => Campanas)
  @UseGuards(new AuthGuard())
  createCampana(@Args('createCampanaInput') createCampanaInput: CreateCampanaInput) {
    return this.campanasService.save(createCampanaInput);
  }

  @Query(() => [Campanas])
  @UseGuards(new AuthGuard())
  findAllCampana() {
    return this.campanasService.findAll();
  }

  @Query(() => Campanas)
  @UseGuards(new AuthGuard())
  findOneCampana(@Args('id', { type: () => Int }) id: number) {
    return this.campanasService.findOne(id);
  }

  @Mutation(() => Campanas)
  @UseGuards(new AuthGuard())
  removeCampana(@Args('id', { type: () => Int }) id: number) {
    return this.campanasService.remove(id);
  }

  @Mutation(() => [Campanas])
  @UseGuards(new AuthGuard())
  removeSeveralCampana(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.campanasService.removeSeveral(id);
  }
}
