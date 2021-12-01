import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasesCmarcoService } from './bases-cmarco.service';
import { CreateBasesCmarcoInput } from './dto/create-bases-cmarco.input';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';

@Resolver(() => BasesCMarco)
export class BasesCmarcoResolver {
  constructor(private readonly basesCmarcoService: BasesCmarcoService) {}

  @Mutation(() => BasesCMarco)
  createBasesCmarco(@Args('createBasesCmarcoInput') createBasesCmarcoInput: CreateBasesCmarcoInput) {
    return this.basesCmarcoService.save(createBasesCmarcoInput);
  }

  @Query(() => [BasesCMarco])
  findAllBaseCMarco() {
    return this.basesCmarcoService.findAll();
  }

  @Query(() => BasesCMarco)
  findOneBaseCMarco(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoService.findOne(id);
  }

  @Mutation(() => BasesCMarco)
  removeBasesCmarco(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoService.remove(id);
  }
}
