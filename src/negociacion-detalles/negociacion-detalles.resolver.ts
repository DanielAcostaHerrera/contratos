import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NegociacionDetallesService } from './negociacion-detalles.service';
import { CreateNegociacionDetallesInput } from './dto/create-negociacion-detalles.input';
import { NegociacionDetalles } from 'src/models/entities/NegociacionDetalles.entity';

@Resolver(() => NegociacionDetalles)
export class NegociacionDetallesResolver {
  constructor(private readonly negociacionDetallesService: NegociacionDetallesService) {}

  @Mutation(() => NegociacionDetalles)
  createNegociacionDetalles(@Args('createNegociacionDetallesInput') createNegociacionDetallesInput: CreateNegociacionDetallesInput) {
    return this.negociacionDetallesService.save(createNegociacionDetallesInput);
  }

  @Query(() => [NegociacionDetalles])
  findAllNegociacionDetalles() {
    return this.negociacionDetallesService.findAll();
  }

  @Query(() => NegociacionDetalles)
  findOneNegociacionDetalles(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionDetallesService.findOne(id);
  }

  @Mutation(() => NegociacionDetalles)
  removeNegociacionDetalles(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionDetallesService.remove(id);
  }
}
