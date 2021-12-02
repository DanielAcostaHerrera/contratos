import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasesGeneralesService } from './bases-generales.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { CreateBasesGeneralesInput } from './dto/create-bases-generales.input';

@Resolver(() => BasesGenerales)
export class BasesGeneralesResolver {
  constructor(private readonly basesGeneralesService: BasesGeneralesService) {}

  @Mutation(() => BasesGenerales)
  createBasesGenerales(@Args('createBasesGeneraleInput') createBasesGeneraleInput: CreateBasesGeneralesInput) {
    return this.basesGeneralesService.save(createBasesGeneraleInput);
  }

  @Query(() => [BasesGenerales])
  findAllBasesGenerales() {
    return this.basesGeneralesService.findAll();
  }

  @Query(() => BasesGenerales)
  findOneBasesGenerales(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesService.findOne(id);
  }

  @Mutation(() => BasesGenerales)
  removeBasesGenerales(@Args('id', { type: () => Int }) id: number) {
    return this.basesGeneralesService.remove(id);
  }
}
