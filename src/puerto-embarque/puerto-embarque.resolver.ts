import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PuertoEmbarqueService } from './puerto-embarque.service';
import { CreatePuertoEmbarqueInput } from './dto/create-puerto-embarque.input';
import { PuertoEmbarque } from 'src/models/entities/PuertoEmbarque.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => PuertoEmbarque)
export class PuertoEmbarqueResolver {
  constructor(private readonly puertoEmbarqueService: PuertoEmbarqueService) {}

  @Mutation(() => PuertoEmbarque)
  @UseGuards(new AuthGuard())
  createPuertoEmbarque(@Args('createPuertoEmbarqueInput') createPuertoEmbarqueInput: CreatePuertoEmbarqueInput) {
    return this.puertoEmbarqueService.save(createPuertoEmbarqueInput);
  }

  @Query(() => [PuertoEmbarque])
  @UseGuards(new AuthGuard())
  findAllPuertoEmbarque() {
    return this.puertoEmbarqueService.findAll();
  }

  @Query(() => PuertoEmbarque)
  @UseGuards(new AuthGuard())
  findOnePuertoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.puertoEmbarqueService.findOne(id);
  }

  @Mutation(() => PuertoEmbarque)
  @UseGuards(new AuthGuard())
  removePuertoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.puertoEmbarqueService.remove(id);
  }

  @Mutation(() => [PuertoEmbarque])
  @UseGuards(new AuthGuard())
  removeSeveralPuertoEmbarque(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.puertoEmbarqueService.removeSeveral(id);
  }
}
