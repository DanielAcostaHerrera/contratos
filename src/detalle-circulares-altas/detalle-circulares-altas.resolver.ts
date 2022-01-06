import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetalleCircularesAltas } from 'src/modelsMercurio/entities/DetalleCircularesAltas.entity';
import { DetalleCircularesAltasService } from './detalle-circulares-altas.service';

@Resolver(() => DetalleCircularesAltas)
export class DetalleCircularesAltasResolver {
  constructor(private readonly detalleCircularesAltasService: DetalleCircularesAltasService) {}

  @Query(() => [DetalleCircularesAltas])
  findAllDetalleCircularesAltas() {
    return this.detalleCircularesAltasService.findAll();
  }

  @Query(() => DetalleCircularesAltas)
  findOneDetalleCircularesAltas(@Args('id', { type: () => Int }) id: number) {
    return this.detalleCircularesAltasService.findOne(id);
  }
}
