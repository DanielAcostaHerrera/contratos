import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SolicitudCodificacionService } from './solicitud-codificacion.service';
import { CreateSolicitudCodificacionInput } from './dto/create-solicitud-codificacion.input';
import { SolicitudCodificacion } from 'src/models/entities/SolicitudCodificacion.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SolicitudCodificacion)
export class SolicitudCodificacionResolver {
  constructor(private readonly solicitudCodificacionService: SolicitudCodificacionService) {}

  @Mutation(() => SolicitudCodificacion)
  @UseGuards(new AuthGuard())
  createSolicitudCodificacion(@Args('createSolicitudCodificacionInput') createSolicitudCodificacionInput: CreateSolicitudCodificacionInput) {
    return this.solicitudCodificacionService.save(createSolicitudCodificacionInput);
  }

  @Query(() => [SolicitudCodificacion])
  @UseGuards(new AuthGuard())
  findAllSolicitudCodificacion() {
    return this.solicitudCodificacionService.findAll();
  }

  @Query(() => SolicitudCodificacion)
  @UseGuards(new AuthGuard())
  findOneSolicitudCodificacion(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudCodificacionService.findOne(id);
  }

  @Mutation(() => SolicitudCodificacion)
  @UseGuards(new AuthGuard())
  removeSolicitudCodificacion(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudCodificacionService.remove(id);
  }

  @Mutation(() => [SolicitudCodificacion])
  @UseGuards(new AuthGuard())
  removeSeveralSolicitudCodificacion(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.solicitudCodificacionService.removeSeveral(id);
  }
}
