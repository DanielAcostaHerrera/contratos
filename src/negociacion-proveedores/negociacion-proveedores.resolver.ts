import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NegociacionProveedoresService } from './negociacion-proveedores.service';
import { CreateNegociacionProveedoresInput } from './dto/create-negociacion-proveedores.input';
import { NegociacionProveedores } from 'src/models/entities/NegociacionProveedores.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => NegociacionProveedores)
export class NegociacionProveedoresResolver {
  constructor(private readonly negociacionProveedoresService: NegociacionProveedoresService) {}

  @Mutation(() => NegociacionProveedores)
  @UseGuards(new AuthGuard())
  createNegociacionProveedores(@Args('createNegociacionProveedoresInput') createNegociacionProveedoresInput: CreateNegociacionProveedoresInput) {
    return this.negociacionProveedoresService.save(createNegociacionProveedoresInput);
  }

  @Query(() => [NegociacionProveedores])
  @UseGuards(new AuthGuard())
  findAllNegociacionProveedores() {
    return this.negociacionProveedoresService.findAll();
  }

  @Query(() => NegociacionProveedores)
  @UseGuards(new AuthGuard())
  findOneNegociacionProveedores(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionProveedoresService.findOne(id);
  }

  @Mutation(() => NegociacionProveedores)
  @UseGuards(new AuthGuard())
  removeNegociacionProveedores(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionProveedoresService.remove(id);
  }

  @Mutation(() => NegociacionProveedores)
  @UseGuards(new AuthGuard())
  removeNegociacionProveedoresByNegociacionId(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionProveedoresService.removeSeveralByNegociacionId(id);
  }

  @Mutation(() => [NegociacionProveedores])
  @UseGuards(new AuthGuard())
  removeSeveralNegociacionProveedores(@Args('id', { type: () => [Int]}) id: number[]) {
    return this.negociacionProveedoresService.removeSeveral(id);
  }
}
