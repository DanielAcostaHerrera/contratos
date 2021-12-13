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

  @ResolveField(() => Ejecutivos, {nullable: true})
  ejecutivoModifica(@Parent() usuarios: Usuarios): Promise<Ejecutivos> {
    return this.usuariosService.getEjecutivo(usuarios.idEjecutivo);
  }
}
