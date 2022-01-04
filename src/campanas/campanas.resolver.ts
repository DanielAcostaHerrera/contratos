import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Campanas } from 'src/models/entities/Campanas.entity';
import { CampanasService } from './campanas.service';
import { CreateCampanaInput } from './dto/create-campana.input';

@Resolver(() => Campanas)
export class CampanasResolver {
  constructor(private readonly campanasService: CampanasService) {}

  @Mutation(() => Campanas)
  createCampana(@Args('createCampanaInput') createCampanaInput: CreateCampanaInput) {
    return this.campanasService.save(createCampanaInput);
  }

  @Query(() => [Campanas])
  findAllCampana() {
    return this.campanasService.findAll();
  }

  @Query(() => Campanas)
  findOneCampana(@Args('id', { type: () => Int }) id: number) {
    return this.campanasService.findOne(id);
  }

  @Mutation(() => Campanas)
  removeCampana(@Args('id', { type: () => Int }) id: number) {
    return this.campanasService.remove(id);
  }

  @Mutation(() => [Campanas])
  removeSeveralCampana(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.campanasService.removeSeveral(id);
  }
}
