import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { SolicitudContratacionService } from './solicitud-contratacion.service';
import { CreateSolicitudContratacionInput } from './dto/create-solicitud-contratacion.input';
import { SolicitudContratacion } from 'src/models/entities/SolicitudContratacion.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => SolicitudContratacion)
export class SolicitudContratacionResolver {
  constructor(private readonly solicitudContratacionService: SolicitudContratacionService) {}

  @Mutation(() => SolicitudContratacion)
  @UseGuards(new AuthGuard())
  createSolicitudContratacion(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('createSolicitudContratacionInput') createSolicitudContratacionInput: CreateSolicitudContratacionInput) {
    return this.solicitudContratacionService.save(usuario,createSolicitudContratacionInput);
  }

  @Query(() => [SolicitudContratacion])
  @UseGuards(new AuthGuard())
  findAllSolicitudContratacion() {
    return this.solicitudContratacionService.findAll();
  }

  @Query(() => SolicitudContratacion)
  @UseGuards(new AuthGuard())
  findOneSolicitudContratacion(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudContratacionService.findOne(id);
  }

  @Mutation(() => SolicitudContratacion)
  @UseGuards(new AuthGuard())
  removeSolicitudContratacion(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => Int }) id: number) {
    return this.solicitudContratacionService.remove(usuario,id);
  }

  @Mutation(() => [SolicitudContratacion])
  @UseGuards(new AuthGuard())
  removeSeveralSolicitudContratacion(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => [Int]}) id: number[]) {
    return this.solicitudContratacionService.removeSeveral(usuario,id);
  }
}
