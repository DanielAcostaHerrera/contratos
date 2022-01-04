import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IncotermService } from './incoterm.service';
import { CreateIncotermInput } from './dto/create-incoterm.input';
import { Incoterm } from 'src/models/entities/Incoterm.entity';

@Resolver(() => Incoterm)
export class IncotermResolver {
  constructor(private readonly incotermService: IncotermService) {}

  @Mutation(() => Incoterm)
  createIncoterm(@Args('createIncotermInput') createIncotermInput: CreateIncotermInput) {
    return this.incotermService.save(createIncotermInput);
  }

  @Query(() => [Incoterm])
  findAllIncoterm() {
    return this.incotermService.findAll();
  }

  @Query(() => Incoterm)
  findOneIncoterm(@Args('id', { type: () => Int }) id: number) {
    return this.incotermService.findOne(id);
  }

  @Mutation(() => Incoterm)
  removeIncoterm(@Args('id', { type: () => Int }) id: number) {
    return this.incotermService.remove(id);
  }

  @Mutation(() => [Incoterm])
  removeSeveralIncoterm(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.incotermService.removeSeveral(id);
  }
}
