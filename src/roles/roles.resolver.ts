import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { CreateRoleInput } from './dto/create-role.input';
import { Roles } from 'src/models/entities/Roles.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => Roles)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Roles)
  @UseGuards(new AuthGuard())
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.save(createRoleInput);
  }

  @Query(() => [Roles])
  @UseGuards(new AuthGuard())
  findAllRoles() {
    return this.rolesService.findAll();
  }

  @Query(() => Roles)
  @UseGuards(new AuthGuard())
  findOneRoles(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Roles)
  @UseGuards(new AuthGuard())
  removeRoles(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.remove(id);
  }

  @Mutation(() => [Roles])
  @UseGuards(new AuthGuard())
  removeSeveralRoles(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.rolesService.removeSeveral(id);
  }
}
