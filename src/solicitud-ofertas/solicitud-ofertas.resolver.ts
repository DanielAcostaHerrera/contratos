import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { SolicitudOfertasService } from './solicitud-ofertas.service';
import { CreateSolicitudOfertaInput } from './dto/create-solicitud-oferta.input';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => SolicitudOfertas)
export class SolicitudOfertasResolver {
  constructor(private readonly solicitudOfertasService: SolicitudOfertasService) {}

  @Mutation(() => SolicitudOfertas)
  @UseGuards(new AuthGuard())
  createSolicitudOferta(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('createSolicitudOfertaInput') createSolicitudOfertaInput: CreateSolicitudOfertaInput) {
    return this.solicitudOfertasService.save(usuario,createSolicitudOfertaInput);
  }

  @Query(() => [SolicitudOfertas])
  @UseGuards(new AuthGuard())
  findAllSolicitudOfertas() {
    return this.solicitudOfertasService.findAll();
  }

  @Query(() => SolicitudOfertas)
  @UseGuards(new AuthGuard())
  findOneSolicitudOfertas(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasService.findOne(id);
  }

  @Mutation(() => SolicitudOfertas)
  @UseGuards(new AuthGuard())
  removeSolicitudOferta(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasService.remove(usuario,id);
  }

  @Mutation(() => [SolicitudOfertas])
  @UseGuards(new AuthGuard())
  removeSeveralSolicitudOferta(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => [Int] }) id: number[]) {
    return this.solicitudOfertasService.removeSeveral(usuario,id);
  }
}
