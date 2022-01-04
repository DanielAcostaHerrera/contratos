import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { CompradoresService } from './compradores.service';
import { CreateCompradoresInput } from './dto/create-compradores.input';

@Resolver(() => Compradores)
export class CompradoresResolver {
  constructor(private readonly compradoresService: CompradoresService) {}

  @Mutation(() => Compradores)
  createCompradore(@Args('createCompradoreInput') createCompradoreInput: CreateCompradoresInput) {
    return this.compradoresService.save(createCompradoreInput);
  }

  @Query(() => [Compradores])
  findAllCompradores() {
    return this.compradoresService.findAll();
  }

  @Query(() => Compradores)
  findOneCompradores(@Args('id', { type: () => Int }) id: number) {
    return this.compradoresService.findOne(id);
  }

  @Mutation(() => Compradores)
  removeCompradores(@Args('id', { type: () => Int }) id: number) {
    return this.compradoresService.remove(id);
  }

  @Mutation(() => [Compradores])
  removeSeveralCompradores(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.compradoresService.removeSeveral(id);
  }
}
