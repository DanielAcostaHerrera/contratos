import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { NegociacionProveedoresService } from './negociacion-proveedores.service';
import { CreateNegociacionProveedoresInput } from './dto/create-negociacion-proveedores.input';
import { NegociacionProveedores } from 'src/models/entities/NegociacionProveedores.entity';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';

@Resolver(() => NegociacionProveedores)
export class NegociacionProveedoresResolver {
  constructor(private readonly negociacionProveedoresService: NegociacionProveedoresService) {}

  @Mutation(() => NegociacionProveedores)
  createNegociacionProveedores(@Args('createNegociacionProveedoresInput') createNegociacionProveedoresInput: CreateNegociacionProveedoresInput) {
    return this.negociacionProveedoresService.save(createNegociacionProveedoresInput);
  }

  @Query(() => [NegociacionProveedores])
  findAllNegociacionProveedores() {
    return this.negociacionProveedoresService.findAll();
  }

  @Query(() => NegociacionProveedores)
  findOneNegociacionProveedores(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionProveedoresService.findOne(id);
  }

  @Mutation(() => NegociacionProveedores)
  removeNegociacionProveedores(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionProveedoresService.remove(id);
  }

  @Mutation(() => [NegociacionProveedores])
  removeSeveralNegociacionProveedores(@Args('id', { type: () => [Int]}) id: number[]) {
    return this.negociacionProveedoresService.removeSeveral(id);
  }

  @ResolveField(() => NegociacionResumen, {nullable: true})
  negociacionResumen(@Parent() negociacionProveedores: NegociacionProveedores): Promise<NegociacionResumen> {
    return this.negociacionProveedoresService.getNegociacionResumen(negociacionProveedores.idNegociacion);
  }
}
