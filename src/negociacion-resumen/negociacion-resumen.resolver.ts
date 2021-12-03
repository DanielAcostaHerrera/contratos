import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NegociacionResumenService } from './negociacion-resumen.service';
import { CreateNegociacionResumenInput } from './dto/create-negociacion-resumen.input';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';

@Resolver(() => NegociacionResumen)
export class NegociacionResumenResolver {
  constructor(private readonly negociacionResumenService: NegociacionResumenService) {}

  @Mutation(() => NegociacionResumen)
  createNegociacionResumen(@Args('createNegociacionResumenInput') createNegociacionResumenInput: CreateNegociacionResumenInput) {
    return this.negociacionResumenService.save(createNegociacionResumenInput);
  }

  @Query(() => [NegociacionResumen])
  findAllNegociacionResumen() {
    return this.negociacionResumenService.findAll();
  }

  @Query(() => NegociacionResumen)
  findOneNegociacionResumen(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionResumenService.findOne(id);
  }

  @Mutation(() => NegociacionResumen)
  removeNegociacionResumen(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionResumenService.remove(id);
  }
}
