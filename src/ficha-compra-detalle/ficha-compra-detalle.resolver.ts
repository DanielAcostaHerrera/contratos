import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FichaCompraDetalleService } from './ficha-compra-detalle.service';
import { CreateFichaCompraDetalleInput } from './dto/create-ficha-compra-detalle.input';
import { FichaCompraDetalle } from 'src/models/entities/FichaCompraDetalle.entity';
import { FichaCompraResumen } from 'src/models/entities/FichaCompraResumen.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => FichaCompraDetalle)
export class FichaCompraDetalleResolver {
  constructor(private readonly fichaCompraDetalleService: FichaCompraDetalleService) {}

  @Mutation(() => FichaCompraDetalle)
  @UseGuards(new AuthGuard())
  createFichaCompraDetalle(@Args('createFichaCompraDetalleInput') createFichaCompraDetalleInput: CreateFichaCompraDetalleInput) {
    return this.fichaCompraDetalleService.save(createFichaCompraDetalleInput);
  }

  @Query(() => [FichaCompraDetalle])
  @UseGuards(new AuthGuard())
  findAllFichaCompraDetalle() {
    return this.fichaCompraDetalleService.findAll();
  }

  @Query(() => FichaCompraDetalle)
  @UseGuards(new AuthGuard())
  findOneFichaCompraDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraDetalleService.findOne(id);
  }

  @Mutation(() => FichaCompraDetalle)
  @UseGuards(new AuthGuard())
  removeFichaCompraDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraDetalleService.remove(id);
  }

  @Mutation(() => [FichaCompraDetalle])
  @UseGuards(new AuthGuard())
  removeSeveralFichaCompraDetalle(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.fichaCompraDetalleService.removeSeveral(id);
  }

  @ResolveField(() => FichaCompraResumen, {nullable: true})
  fichaCompraResumen(@Parent() fichaCompraDetalle: FichaCompraDetalle): Promise<FichaCompraResumen> {
    return this.fichaCompraDetalleService.getFichaCompraResumen(fichaCompraDetalle.idFicha);
  }

  @ResolveField(() => CodigosParaLaVenta, {nullable: true})
  codigo(@Parent() fichaCompraDetalle: FichaCompraDetalle): Promise<CodigosParaLaVenta> {
    return this.fichaCompraDetalleService.getCodigo(fichaCompraDetalle.idCodigo);
  }

  @ResolveField(() => UnidadMedida, {nullable: true})
  unidadMedida(@Parent() fichaCompraDetalle: FichaCompraDetalle): Promise<UnidadMedida> {
    return this.fichaCompraDetalleService.getUnidadMedida(fichaCompraDetalle.idUm);
  }
}
