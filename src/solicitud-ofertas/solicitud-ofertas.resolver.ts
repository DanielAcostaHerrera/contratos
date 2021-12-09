import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SolicitudOfertasService } from './solicitud-ofertas.service';
import { CreateSolicitudOfertaInput } from './dto/create-solicitud-oferta.input';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { SolicitudContratacion } from 'src/models/entities/SolicitudContratacion.entity';

@Resolver(() => SolicitudOfertas)
export class SolicitudOfertasResolver {
  constructor(private readonly solicitudOfertasService: SolicitudOfertasService) {}

  @Mutation(() => SolicitudOfertas)
  createSolicitudOferta(@Args('createSolicitudOfertaInput') createSolicitudOfertaInput: CreateSolicitudOfertaInput) {
    return this.solicitudOfertasService.save(createSolicitudOfertaInput);
  }

  @Query(() => [SolicitudOfertas])
  findAllSolicitudOfertas() {
    return this.solicitudOfertasService.findAll();
  }

  @Query(() => SolicitudOfertas)
  findOneSolicitudOfertas(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasService.findOne(id);
  }

  @Mutation(() => SolicitudOfertas)
  removeSolicitudOferta(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasService.remove(id);
  }

  @ResolveField(() => SolicitudContratacion, {nullable: true})
  solicitudContrato(@Parent() solicitudOfertas: SolicitudOfertas): Promise<SolicitudContratacion> {
    return this.solicitudOfertasService.getSolicitudContratacion(solicitudOfertas.idSolicitudContrato);
  }
}
