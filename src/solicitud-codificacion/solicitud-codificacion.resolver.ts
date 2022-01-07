import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SolicitudCodificacionService } from './solicitud-codificacion.service';
import { CreateSolicitudCodificacionInput } from './dto/create-solicitud-codificacion.input';
import { SolicitudCodificacion } from 'src/models/entities/SolicitudCodificacion.entity';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { Embalajes } from 'src/models/entities/Embalajes.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';

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

  @ResolveField(() => Embalajes, {nullable: true})
  embalaje(@Parent() solicitudCodificacion: SolicitudCodificacion): Promise<Embalajes> {
    return this.solicitudCodificacionService.getEmbalaje(solicitudCodificacion.idEmbalaje);
  }

  @ResolveField(() => UnidadMedida, {nullable: true})
  unidadMedida(@Parent() solicitudCodificacion: SolicitudCodificacion): Promise<UnidadMedida> {
    return this.solicitudCodificacionService.getUnidadMedida(solicitudCodificacion.idUm);
  }

  @ResolveField(() => Referencias, {nullable: true})
  referencia(@Parent() solicitudCodificacion: SolicitudCodificacion): Promise<Referencias> {
    return this.solicitudCodificacionService.getReferencia(solicitudCodificacion.idReferencia);
  }
}
