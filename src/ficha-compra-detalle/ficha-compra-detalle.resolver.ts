import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FichaCompraDetalleService } from './ficha-compra-detalle.service';
import { CreateFichaCompraDetalleInput } from './dto/create-ficha-compra-detalle.input';
import { FichaCompraDetalle } from 'src/models/entities/FichaCompraDetalle.entity';
import { FichaCompraResumen } from 'src/models/entities/FichaCompraResumen.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';

@Resolver(() => FichaCompraDetalle)
export class FichaCompraDetalleResolver {
  constructor(private readonly fichaCompraDetalleService: FichaCompraDetalleService) {}

  @Mutation(() => FichaCompraDetalle)
  createFichaCompraDetalle(@Args('createFichaCompraDetalleInput') createFichaCompraDetalleInput: CreateFichaCompraDetalleInput) {
    return this.fichaCompraDetalleService.save(createFichaCompraDetalleInput);
  }

  @Query(() => [FichaCompraDetalle])
  findAllFichaCompraDetalle() {
    return this.fichaCompraDetalleService.findAll();
  }

  @Query(() => FichaCompraDetalle)
  findOneFichaCompraDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraDetalleService.findOne(id);
  }

  @Mutation(() => FichaCompraDetalle)
  removeFichaCompraDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.fichaCompraDetalleService.remove(id);
  }

  @Mutation(() => [FichaCompraDetalle])
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
