import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { NegociacionDetallesService } from './negociacion-detalles.service';
import { CreateNegociacionDetallesInput } from './dto/create-negociacion-detalles.input';
import { NegociacionDetalles } from 'src/models/entities/NegociacionDetalles.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => NegociacionDetalles)
export class NegociacionDetallesResolver {
  constructor(private readonly negociacionDetallesService: NegociacionDetallesService) {}

  @Mutation(() => NegociacionDetalles)
  @UseGuards(new AuthGuard())
  createNegociacionDetalles(@Args('createNegociacionDetallesInput') createNegociacionDetallesInput: CreateNegociacionDetallesInput) {
    return this.negociacionDetallesService.save(createNegociacionDetallesInput);
  }

  @Query(() => [NegociacionDetalles])
  @UseGuards(new AuthGuard())
  findAllNegociacionDetalles() {
    return this.negociacionDetallesService.findAll();
  }

  @Query(() => NegociacionDetalles)
  @UseGuards(new AuthGuard())
  findOneNegociacionDetalles(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionDetallesService.findOne(id);
  }

  @Mutation(() => NegociacionDetalles)
  @UseGuards(new AuthGuard())
  removeNegociacionDetalles(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionDetallesService.remove(id);
  }

  @Mutation(() => [NegociacionDetalles])
  @UseGuards(new AuthGuard())
  removeSeveralNegociacionDetalles(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.negociacionDetallesService.removeSeveral(id);
  }

  @ResolveField(() => NegociacionResumen, {nullable: true})
  negociacionResumen(@Parent() negociacionDetalles: NegociacionDetalles): Promise<NegociacionResumen> {
    return this.negociacionDetallesService.getNegociacionResumen(negociacionDetalles.idNegociacion);
  }
}
