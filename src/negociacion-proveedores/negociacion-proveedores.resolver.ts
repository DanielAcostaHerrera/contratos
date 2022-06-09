import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { NegociacionProveedoresService } from './negociacion-proveedores.service';
import { CreateNegociacionProveedoresInput } from './dto/create-negociacion-proveedores.input';
import { NegociacionProveedores } from 'src/models/entities/NegociacionProveedores.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';

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

  @Mutation(() => [NegociacionProveedores])
  @UseGuards(new AuthGuard())
  removeSeveralNegociacionProveedores(@Args('id', { type: () => [Int]}) id: number[]) {
    return this.negociacionProveedoresService.removeSeveral(id);
  }

  @ResolveField(() => NegociacionResumen, {nullable: true})
  negociacionResumen(@Parent() negociacionProveedores: NegociacionProveedores): Promise<NegociacionResumen> {
    return this.negociacionProveedoresService.getNegociacionResumen(negociacionProveedores.idNegociacion);
  }

  @ResolveField(() => Proveedores, {nullable: true})
  proveedor(@Parent() negociacionProveedores: NegociacionProveedores): Promise<Proveedores> {
    return this.negociacionProveedoresService.getProveedor(negociacionProveedores.idProveedor);
  }
}
