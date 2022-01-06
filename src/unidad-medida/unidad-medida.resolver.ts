import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { UnidadMedidaService } from './unidad-medida.service';

@Resolver(() => UnidadMedida)
export class UnidadMedidaResolver {
  constructor(private readonly unidadMedidaService: UnidadMedidaService) {}

  @Query(() => [UnidadMedida])
  findAllUnidadMedida() {
    return this.unidadMedidaService.findAll();
  }

  @Query(() => UnidadMedida)
  findOneUnidadMedida(@Args('id', { type: () => Int }) id: number) {
    return this.unidadMedidaService.findOne(id);
  }
}
