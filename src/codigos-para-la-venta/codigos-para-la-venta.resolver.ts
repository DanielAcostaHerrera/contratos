import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { CodigosParaLaVentaService } from './codigos-para-la-venta.service';

@Resolver(() => CodigosParaLaVenta)
export class CodigosParaLaVentaResolver {
  constructor(private readonly codigosParaLaVentaService: CodigosParaLaVentaService) {}

  @Query(() => [CodigosParaLaVenta])
  @UseGuards(new AuthGuard())
  findAllCodigosParaLaVenta() {
    return this.codigosParaLaVentaService.findAll();
  }

  @Query(() => CodigosParaLaVenta)
  @UseGuards(new AuthGuard())
  findOneCodigosParaLaVenta(@Args('id', { type: () => Int }) id: number) {
    return this.codigosParaLaVentaService.findOne(id);
  }

  @Query(() => [CodigosParaLaVenta])
  @UseGuards(new AuthGuard())
  findCodigosParaLaVentaByListaCodigos(@Args('filename') filename: string) {
    return this.codigosParaLaVentaService.findByListaCodigos(filename);
  }
}
