import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SolicitudOfertasEntradasService } from './solicitud-ofertas-entradas.service';
import { CreateSolicitudOfertasEntradaInput } from './dto/create-solicitud-ofertas-entrada.input';
import { SolicitudOfertasEntradas } from 'src/models/entities/SolicitudOfertasEntradas.entity';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SolicitudOfertasEntradas)
export class SolicitudOfertasEntradasResolver {
  constructor(private readonly solicitudOfertasEntradasService: SolicitudOfertasEntradasService) {}

  @Mutation(() => SolicitudOfertasEntradas)
  @UseGuards(new AuthGuard())
  createSolicitudOfertasEntrada(@Args('createSolicitudOfertasEntradaInput') createSolicitudOfertasEntradaInput: CreateSolicitudOfertasEntradaInput) {
    return this.solicitudOfertasEntradasService.save(createSolicitudOfertasEntradaInput);
  }

  @Query(() => [SolicitudOfertasEntradas])
  @UseGuards(new AuthGuard())
  findAllSolicitudOfertasEntrada() {
    return this.solicitudOfertasEntradasService.findAll();
  }

  @Query(() => SolicitudOfertasEntradas)
  @UseGuards(new AuthGuard())
  findOneSolicitudOfertasEntrada(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasEntradasService.findOne(id);
  }

  @Mutation(() => SolicitudOfertasEntradas)
  @UseGuards(new AuthGuard())
  removeSolicitudOfertasEntrada(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasEntradasService.remove(id);
  }

  @Mutation(() => [SolicitudOfertasEntradas])
  @UseGuards(new AuthGuard())
  removeSeveralSolicitudOfertasEntrada(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.solicitudOfertasEntradasService.removeSeveral(id);
  }

  @ResolveField(() => SolicitudOfertasProveedor, {nullable: true})
  ofertasProveedor(@Parent() solicitudOfertasEntradas: SolicitudOfertasEntradas): Promise<SolicitudOfertasProveedor> {
    return this.solicitudOfertasEntradasService.getSolicitudOfertasProveedor(solicitudOfertasEntradas.idOfertasProveedor);
  }

  @ResolveField(() => UnidadMedida, {nullable: true})
  unidadMedida(@Parent() solicitudOfertasEntradas: SolicitudOfertasEntradas): Promise<UnidadMedida> {
    return this.solicitudOfertasEntradasService.getUnidadMedida(solicitudOfertasEntradas.idUm);
  }

  @ResolveField(() => CodigosParaLaVenta, {nullable: true})
  codigo(@Parent() solicitudOfertasEntradas: SolicitudOfertasEntradas): Promise<CodigosParaLaVenta> {
    return this.solicitudOfertasEntradasService.getCodigo(solicitudOfertasEntradas.idCodigo);
  }

  @ResolveField(() => Referencias, {nullable: true})
  referencia(@Parent() solicitudOfertasEntradas: SolicitudOfertasEntradas): Promise<Referencias> {
    return this.solicitudOfertasEntradasService.getReferencia(solicitudOfertasEntradas.idReferencia);
  }
}
