import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IncotermService } from './incoterm.service';
import { CreateIncotermInput } from './dto/create-incoterm.input';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => Incoterm)
export class IncotermResolver {
  constructor(private readonly incotermService: IncotermService) {}

  @Mutation(() => Incoterm)
  @UseGuards(new AuthGuard())
  createIncoterm(@Args('createIncotermInput') createIncotermInput: CreateIncotermInput) {
    return this.incotermService.save(createIncotermInput);
  }

  @Query(() => [Incoterm])
  @UseGuards(new AuthGuard())
  findAllIncoterm() {
    return this.incotermService.findAll();
  }

  @Query(() => Incoterm)
  @UseGuards(new AuthGuard())
  findOneIncoterm(@Args('id', { type: () => Int }) id: number) {
    return this.incotermService.findOne(id);
  }

  @Mutation(() => Incoterm)
  @UseGuards(new AuthGuard())
  removeIncoterm(@Args('id', { type: () => Int }) id: number) {
    return this.incotermService.remove(id);
  }

  @Mutation(() => [Incoterm])
  @UseGuards(new AuthGuard())
  removeSeveralIncoterm(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.incotermService.removeSeveral(id);
  }
}
