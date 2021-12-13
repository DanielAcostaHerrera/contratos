import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { CreateRoleInput } from './dto/create-role.input';
import { Roles } from 'src/models/entities/Roles.entity';

@Resolver(() => Roles)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Roles)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.save(createRoleInput);
  }

  @Query(() => [Roles])
  findAllRoles() {
    return this.rolesService.findAll();
  }

  @Query(() => Roles)
  findOneRoles(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Roles)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.remove(id);
  }
}
