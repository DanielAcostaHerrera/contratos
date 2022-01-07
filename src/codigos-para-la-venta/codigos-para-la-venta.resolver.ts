import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { CodigosParaLaVentaService } from './codigos-para-la-venta.service';

@Resolver(() => CodigosParaLaVenta)
export class CodigosParaLaVentaResolver {
  constructor(private readonly codigosParaLaVentaService: CodigosParaLaVentaService) {}

  @Query(() => [CodigosParaLaVenta])
  findAllCodigosParaLaVenta() {
    return this.codigosParaLaVentaService.findAll();
  }

  @Query(() => CodigosParaLaVenta)
  findOneCodigosParaLaVenta(@Args('id', { type: () => Int }) id: number) {
    return this.codigosParaLaVentaService.findOne(id);
  }
}
