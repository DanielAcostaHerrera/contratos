import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SolicitudOfertasEntradasService } from './solicitud-ofertas-entradas.service';
import { CreateSolicitudOfertasEntradaInput } from './dto/create-solicitud-ofertas-entrada.input';
import { SolicitudOfertasEntradas } from 'src/models/entities/SolicitudOfertasEntradas.entity';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';

@Resolver(() => SolicitudOfertasEntradas)
export class SolicitudOfertasEntradasResolver {
  constructor(private readonly solicitudOfertasEntradasService: SolicitudOfertasEntradasService) {}

  @Mutation(() => SolicitudOfertasEntradas)
  createSolicitudOfertasEntrada(@Args('createSolicitudOfertasEntradaInput') createSolicitudOfertasEntradaInput: CreateSolicitudOfertasEntradaInput) {
    return this.solicitudOfertasEntradasService.save(createSolicitudOfertasEntradaInput);
  }

  @Query(() => [SolicitudOfertasEntradas])
  findAllSolicitudOfertasEntrada() {
    return this.solicitudOfertasEntradasService.findAll();
  }

  @Query(() => SolicitudOfertasEntradas)
  findOneSolicitudOfertasEntrada(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasEntradasService.findOne(id);
  }

  @Mutation(() => SolicitudOfertasEntradas)
  removeSolicitudOfertasEntrada(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasEntradasService.remove(id);
  }

  @ResolveField(() => SolicitudOfertasProveedor, {nullable: true})
  ofertasProveedor(@Parent() solicitudOfertasEntradas: SolicitudOfertasEntradas): Promise<SolicitudOfertasProveedor> {
    return this.solicitudOfertasEntradasService.getSolicitudOfertasProveedor(solicitudOfertasEntradas.idOfertasProveedor);
  }
}
