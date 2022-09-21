import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { PuertosService } from './puertos.service';
import { CreatePuertoInput } from './dto/create-puerto.input';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => Puertos)
export class PuertosResolver {
  constructor(private readonly puertosService: PuertosService) {}

  @Mutation(() => Puertos)
  @UseGuards(new AuthGuard())
  createPuerto(@Args('createPuertoInput') createPuertoInput: CreatePuertoInput) {
    return this.puertosService.save(createPuertoInput);
  }

  @Query(() => [Puertos])
  @UseGuards(new AuthGuard())
  findAllPuertos() {
    return this.puertosService.findAll();
  }

  @Query(() => Puertos)
  @UseGuards(new AuthGuard())
  findOnePuertos(@Args('id', { type: () => Int }) id: number) {
    return this.puertosService.findOne(id);
  }

  @Mutation(() => Puertos)
  @UseGuards(new AuthGuard())
  removePuerto(@Args('id', { type: () => Int }) id: number) {
    return this.puertosService.remove(id);
  }

  @Mutation(() => [Puertos])
  @UseGuards(new AuthGuard())
  removeSeveralPuerto(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.puertosService.removeSeveral(id);
  }
}
