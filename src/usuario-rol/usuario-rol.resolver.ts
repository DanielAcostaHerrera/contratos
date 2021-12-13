import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsuarioRolService } from './usuario-rol.service';
import { CreateUsuarioRolInput } from './dto/create-usuario-rol.input';
import { UsuarioRol } from 'src/models/entities/UsuarioRol.entity';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { Roles } from 'src/models/entities/Roles.entity';

@Resolver(() => UsuarioRol)
export class UsuarioRolResolver {
  constructor(private readonly usuarioRolService: UsuarioRolService) {}

  @Mutation(() => UsuarioRol)
  createUsuarioRol(@Args('createUsuarioRolInput') createUsuarioRolInput: CreateUsuarioRolInput) {
    return this.usuarioRolService.save(createUsuarioRolInput);
  }

  @Query(() => [UsuarioRol])
  findAllUsuarioRol() {
    return this.usuarioRolService.findAll();
  }

  @Query(() => UsuarioRol)
  findOneUsuarioRol(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioRolService.findOne(id);
  }

  @Mutation(() => UsuarioRol)
  removeUsuarioRol(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioRolService.remove(id);
  }

  @ResolveField(() => Usuarios, {nullable: true})
  usuario(@Parent() usuarioRol: UsuarioRol): Promise<Usuarios> {
    return this.usuarioRolService.getUsuario(usuarioRol.idUsuario);
  }

    @ResolveField(() => Roles, {nullable: true})
    rol(@Parent() usuarioRol: UsuarioRol): Promise<Roles> {
    return this.usuarioRolService.getRol(usuarioRol.idRol);
  }
}
