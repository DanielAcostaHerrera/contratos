import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsuarioRolService } from './usuario-rol.service';
import { CreateUsuarioRolInput } from './dto/create-usuario-rol.input';
import { UsuarioRol } from 'src/models/entities/UsuarioRol.entity';
import { Roles } from 'src/models/entities/Roles.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => UsuarioRol)
export class UsuarioRolResolver {
  constructor(private readonly usuarioRolService: UsuarioRolService) {}

  @Mutation(() => UsuarioRol)
  @UseGuards(new AuthGuard())
  createUsuarioRol(@Args('createUsuarioRolInput') createUsuarioRolInput: CreateUsuarioRolInput) {
    return this.usuarioRolService.save(createUsuarioRolInput);
  }

  @Query(() => [UsuarioRol])
  @UseGuards(new AuthGuard())
  findAllUsuarioRol() {
    return this.usuarioRolService.findAll();
  }

  @Query(() => UsuarioRol)
  @UseGuards(new AuthGuard())
  findOneUsuarioRol(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioRolService.findOne(id);
  }

  @Mutation(() => UsuarioRol)
  @UseGuards(new AuthGuard())
  removeUsuarioRol(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioRolService.remove(id);
  }

  @Mutation(() => UsuarioRol)
  @UseGuards(new AuthGuard())
  removeUsuarioRolByUserId(@Args('idUsuario', { type: () => Int }) idUsuario: number) {
    return this.usuarioRolService.remove(idUsuario);
  }

  @Mutation(() => [UsuarioRol])
  @UseGuards(new AuthGuard())
  removeSeveralUsuarioRol(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.usuarioRolService.removeSeveral(id);
  }

    @ResolveField(() => Roles, {nullable: true})
    rol(@Parent() usuarioRol: UsuarioRol): Promise<Roles> {
    return this.usuarioRolService.getRol(usuarioRol.idRol);
  }
}
