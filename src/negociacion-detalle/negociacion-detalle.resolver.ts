import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NegociacionDetalleService } from './negociacion-detalle.service';
import { CreateNegociacionDetalleInput } from './dto/create-negociacion-detalle.input';
import { NegociacionDetalle } from 'src/models/entities/NegociacionDetalle.entity';

@Resolver(() => NegociacionDetalle)
export class NegociacionDetalleResolver {
  constructor(private readonly negociacionDetalleService: NegociacionDetalleService) {}

  @Mutation(() => NegociacionDetalle)
  createNegociacionDetalle(@Args('createNegociacionDetalleInput') createNegociacionDetalleInput: CreateNegociacionDetalleInput) {
    return this.negociacionDetalleService.save(createNegociacionDetalleInput);
  }

  @Query(() => [NegociacionDetalle])
  findAllNegociacionDetalle() {
    return this.negociacionDetalleService.findAll();
  }

  @Query(() => NegociacionDetalle)
  findOneNegociacionDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionDetalleService.findOne(id);
  }

  @Mutation(() => NegociacionDetalle)
  removeNegociacionDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionDetalleService.remove(id);
  }
}
