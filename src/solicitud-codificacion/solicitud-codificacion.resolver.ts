import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SolicitudCodificacionService } from './solicitud-codificacion.service';
import { CreateSolicitudCodificacionInput } from './dto/create-solicitud-codificacion.input';
import { SolicitudCodificacion } from 'src/models/entities/SolicitudCodificacion.entity';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';

@Resolver(() => SolicitudCodificacion)
export class SolicitudCodificacionResolver {
  constructor(private readonly solicitudCodificacionService: SolicitudCodificacionService) {}

  @Mutation(() => SolicitudCodificacion)
  createSolicitudCodificacion(@Args('createSolicitudCodificacionInput') createSolicitudCodificacionInput: CreateSolicitudCodificacionInput) {
    return this.solicitudCodificacionService.save(createSolicitudCodificacionInput);
  }

  @Query(() => [SolicitudCodificacion])
  findAllSolicitudCodificacion() {
    return this.solicitudCodificacionService.findAll();
  }

  @Query(() => SolicitudCodificacion)
  findOneSolicitudCodificacion(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudCodificacionService.findOne(id);
  }

  @Mutation(() => SolicitudCodificacion)
  removeSolicitudCodificacion(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudCodificacionService.remove(id);
  }

  @Mutation(() => [SolicitudCodificacion])
  removeSeveralSolicitudCodificacion(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.solicitudCodificacionService.removeSeveral(id);
  }

  @ResolveField(() => PliegoConcurrenciaResumen, {nullable: true})
  pliegoResumen(@Parent() solicitudCodificacion: SolicitudCodificacion): Promise<PliegoConcurrenciaResumen> {
    return this.solicitudCodificacionService.getPliegoConcurrenciaResumen(solicitudCodificacion.idPliegoResumen);
  }
}
