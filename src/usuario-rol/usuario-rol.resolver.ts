import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsuarioRolService } from './usuario-rol.service';
import { CreateUsuarioRolInput } from './dto/create-usuario-rol.input';
import { UsuarioRol } from 'src/models/entities/UsuarioRol.entity';
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

  @Mutation(() => UsuarioRol)
  removeUsuarioRolByUserId(@Args('idUsuario', { type: () => Int }) idUsuario: number) {
    return this.usuarioRolService.remove(idUsuario);
  }

  @Mutation(() => [UsuarioRol])
  removeSeveralUsuarioRol(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.usuarioRolService.removeSeveral(id);
  }

    @ResolveField(() => Roles, {nullable: true})
    rol(@Parent() usuarioRol: UsuarioRol): Promise<Roles> {
    return this.usuarioRolService.getRol(usuarioRol.idRol);
  }
}
