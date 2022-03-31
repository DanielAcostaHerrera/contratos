import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { UnidadMedidaService } from './unidad-medida.service';

@Resolver(() => UnidadMedida)
export class UnidadMedidaResolver {
  constructor(private readonly unidadMedidaService: UnidadMedidaService) {}

  @Query(() => [UnidadMedida])
  @UseGuards(new AuthGuard())
  findAllUnidadMedida() {
    return this.unidadMedidaService.findAll();
  }

  @Query(() => UnidadMedida)
  @UseGuards(new AuthGuard())
  findOneUnidadMedida(@Args('id', { type: () => Int }) id: number) {
    return this.unidadMedidaService.findOne(id);
  }
}
