import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NegociacionProveedoresService } from './negociacion-proveedores.service';
import { CreateNegociacionProveedoresInput } from './dto/create-negociacion-proveedores.input';
import { NegociacionProveedores } from 'src/models/entities/NegociacionProveedores.entity';

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
}
