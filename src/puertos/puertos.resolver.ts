import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PuertosService } from './puertos.service';
import { CreatePuertoInput } from './dto/create-puerto.input';
import { Puertos } from 'src/models/entities/Puertos.entity';

@Resolver(() => Puertos)
export class PuertosResolver {
  constructor(private readonly puertosService: PuertosService) {}

  @Mutation(() => Puertos)
  createPuerto(@Args('createPuertoInput') createPuertoInput: CreatePuertoInput) {
    return this.puertosService.save(createPuertoInput);
  }

  @Query(() => [Puertos])
  findAllPuertos() {
    return this.puertosService.findAll();
  }

  @Query(() => Puertos)
  findOnePuertos(@Args('id', { type: () => Int }) id: number) {
    return this.puertosService.findOne(id);
  }

  @Mutation(() => Puertos)
  removePuerto(@Args('id', { type: () => Int }) id: number) {
    return this.puertosService.remove(id);
  }

  @Mutation(() => [Puertos])
  removeSeveralPuerto(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.puertosService.removeSeveral(id);
  }
}
