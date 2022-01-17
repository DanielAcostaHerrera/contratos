import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';

@Resolver(() => Usuarios)
export class UsuariosResolver {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Mutation(() => Usuarios)
  createUsuario(@Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput) {
    return this.usuariosService.save(createUsuarioInput);
  }

  @Mutation(() => Usuarios)
  forcePasswordUsuario(@Args('idUsuario', { type: () => Int }) idUsuario: number) {
    return this.usuariosService.forcePassword(idUsuario);
  }

  @Mutation(() => Usuarios)
  modifyPasswordUsuario(
    @Args('idUsuario', { type: () => Int }) idUsuario: number,
    @Args('contrasenaVieja', { type: () => String }) contrasenaVieja: string,
    @Args('contrasenaNueva', { type: () => String }) contrasenaNueva: string,
    @Args('contrasenaNuevaConfirmar', { type: () => String }) contrasenaNuevaConfirmar: string,
    ) {
    return this.usuariosService.modificarContrasena(idUsuario,contrasenaVieja,contrasenaNueva,contrasenaNuevaConfirmar);
  }

  @Query(() => [Usuarios])
  findAllUsuarios() {
    return this.usuariosService.findAll();
  }

  @Query(() => Usuarios)
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
  removeUsuario(@Args('id', { type: () => Int }) id: number) {
    return this.usuariosService.remove(id);
  }

  @Mutation(() => [Usuarios])
  removeSeveralUsuario(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.usuariosService.removeSeveral(id);
  }

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivo(@Parent() usuarios: Usuarios): Promise<Ejecutivos> {
    return this.usuariosService.getEjecutivo(usuarios.idEjecutivo);
  }
}
