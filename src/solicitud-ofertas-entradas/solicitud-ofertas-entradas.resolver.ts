import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { SolicitudOfertasEntradasService } from './solicitud-ofertas-entradas.service';
import { CreateSolicitudOfertasEntradaInput } from './dto/create-solicitud-ofertas-entrada.input';
import { SolicitudOfertasEntradas } from 'src/models/entities/SolicitudOfertasEntradas.entity';
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
}
