import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { ContratoMarco } from '../models/entities/ContratoMarco.entity';
import { Proveedores } from '../modelsMercurio/entities/Proveedores.entity';
import { ContratoMarcoService } from './contrato-marco.service';
import { CreateContratoMarcoInput } from './dto/create-contrato-marco.input';

@Resolver(() => ContratoMarco)
export class ContratoMarcoResolver {
  constructor(private readonly contratoMarcoService: ContratoMarcoService) {}

  @Mutation(() => ContratoMarco)
  @UseGuards(new AuthGuard())
  createContratoMarco(@Args('createContratoMarcoInput') createContratoMarcoInput: CreateContratoMarcoInput) {
    return this.contratoMarcoService.save(createContratoMarcoInput);
  }

  @Query(() => [ContratoMarco], { name: 'contratoMarco' })
  @UseGuards(new AuthGuard())
  findAllContratoMarco() {
    return this.contratoMarcoService.findAll();
  }

  @Query(() => ContratoMarco, { name: 'contratoMarco' })
  @UseGuards(new AuthGuard())
  findOneContratoMarco(@Args('id', { type: () => Int }) id: number) {
    return this.contratoMarcoService.findOne(id);
  }

  @Mutation(() => ContratoMarco)
  @UseGuards(new AuthGuard())
  removeContratoMarco(@Args('id', { type: () => Int }) id: number) {
    return this.contratoMarcoService.remove(id);
  }

  @Mutation(() => [ContratoMarco])
  @UseGuards(new AuthGuard())
  removeSeveralContratoMarco(
    @Args('id', { type: () => [Int] }) id: number[]) {
    return this.contratoMarcoService.removeSeveral(id);
  }

  @ResolveField(() => Proveedores, {nullable: true})
  @UseGuards(new AuthGuard()) 
  proveedor(@Parent() contratoMarco: ContratoMarco): Promise<Proveedores> {
    return this.contratoMarcoService.getProveedor(contratoMarco.idProveedor);
  }
}
