import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Usuarios)
export class UsuariosResolver {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Mutation(() => Usuarios)
  @UseGuards(new AuthGuard())
  createUsuario(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput) {
    return this.usuariosService.save(usuario,createUsuarioInput);
  }

  @Mutation(() => Usuarios)
  @UseGuards(new AuthGuard())
  forcePasswordUsuario(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('idUsuario', { type: () => Int }) idUsuario: number) {
    return this.usuariosService.forcePassword(usuario,idUsuario);
  }

  @Mutation(() => Usuarios)
  @UseGuards(new AuthGuard())
  modifyPasswordUsuario(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('idUsuario', { type: () => Int }) idUsuario: number,
    @Args('contrasenaVieja', { type: () => String }) contrasenaVieja: string,
    @Args('contrasenaNueva', { type: () => String }) contrasenaNueva: string,
    @Args('contrasenaNuevaConfirmar', { type: () => String }) contrasenaNuevaConfirmar: string,
    ) {
    return this.usuariosService.modificarContrasena(usuario,idUsuario,contrasenaVieja,contrasenaNueva,contrasenaNuevaConfirmar);
  }

  @Query(() => [Usuarios])
  @UseGuards(new AuthGuard())
  findAllUsuarios() {
    return this.usuariosService.findAll();
  }

  @Query(() => Usuarios)
  @UseGuards(new AuthGuard())
  findOneUsuarios(@Args('id', { type: () => Int }) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Query(() => Usuarios)
  autenticarUsuarios(
      @Args('nombreUsuario', { type: () => String }) nombreUsuario: string, 
      @Args('contrasena', { type: () => String }) contrasena: string, 
    ) {
    return this.usuariosService.autenticar(nombreUsuario,contrasena);
  }

  @Mutation(() => Usuarios)
  @UseGuards(new AuthGuard())
  removeUsuario(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => Int }) id: number) {
    return this.usuariosService.remove(usuario,id);
  }

  @Mutation(() => [Usuarios])
  @UseGuards(new AuthGuard())
  removeSeveralUsuario(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Args('id', { type: () => [Int] }) id: number[]) {
    return this.usuariosService.removeSeveral(usuario,id);
  }

  @Mutation(() => Usuarios)
  @UseGuards(new AuthGuard())
  refreshToken(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios) {
    return this.usuariosService.refreshToken(usuario);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivo(@Parent() usuarios: Usuarios): Promise<Ejecutivos> {
    return this.usuariosService.getEjecutivo(usuarios.idEjecutivo);
  }
}
