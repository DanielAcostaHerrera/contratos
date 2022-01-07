import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { DetalleDeCircularesAltas } from 'src/modelsMercurio/entities/DetalleDeCircularesAltas.entity';
import { DetalleDeCircularesAltasService } from './detalle-de-circulares-altas.service';

@Resolver(() => DetalleDeCircularesAltas)
export class DetalleDeCircularesAltasResolver {
  constructor(private readonly detalleDeCircularesAltasService: DetalleDeCircularesAltasService) {}

  @Query(() => [DetalleDeCircularesAltas])
  findAllDetalleDeCircularesAltas() {
    return this.detalleDeCircularesAltasService.findAll();
  }

  @Query(() => DetalleDeCircularesAltas)
  findOneDetalleDeCircularesAltas(@Args('id', { type: () => Int }) id: number) {
    return this.detalleDeCircularesAltasService.findOne(id);
  }
}
