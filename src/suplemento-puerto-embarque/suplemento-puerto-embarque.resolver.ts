import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { SuplementoPuertoEmbarqueService } from './suplemento-puerto-embarque.service';
import { CreateSuplementoPuertoEmbarqueInput } from './dto/create-suplemento-puerto-embarque.input';
import { SuplementoPuertoEmbarque } from 'src/models/entities/SuplementoPuertoEmbarque.entity';
import { AuthGuard } from 'src/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => SuplementoPuertoEmbarque)
export class SuplementoPuertoEmbarqueResolver {
  constructor(private readonly suplementoPuertoEmbarqueService: SuplementoPuertoEmbarqueService) {}

  @Mutation(() => SuplementoPuertoEmbarque)
  @UseGuards(new AuthGuard())
  createSuplementoPuertoEmbarque(@Args('createSuplementoPuertoEmbarqueInput') createSuplementoPuertoEmbarqueInput: CreateSuplementoPuertoEmbarqueInput) {
    return this.suplementoPuertoEmbarqueService.save(createSuplementoPuertoEmbarqueInput);
  }

  @Query(() => [SuplementoPuertoEmbarque])
  @UseGuards(new AuthGuard())
  findAllSuplementoPuertoEmbarque() {
    return this.suplementoPuertoEmbarqueService.findAll();
  }

  @Query(() => SuplementoPuertoEmbarque)
  @UseGuards(new AuthGuard())
  findOneSuplementoPuertoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoPuertoEmbarqueService.findOne(id);
  }

  @Mutation(() => SuplementoPuertoEmbarque)
  @UseGuards(new AuthGuard())
  removeSuplementoPuertoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.suplementoPuertoEmbarqueService.remove(id);
  }

  @Mutation(() => [SuplementoPuertoEmbarque])
  @UseGuards(new AuthGuard())
  removeSeveralSuplementoPuertoEmbarque(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.suplementoPuertoEmbarqueService.removeSeveral(id);
  }
}
