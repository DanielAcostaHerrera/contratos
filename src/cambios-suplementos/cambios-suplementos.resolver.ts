import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CambiosSuplementos } from 'src/models/entities/CambiosSuplementos.entity';
import { CambiosSuplementosService } from './cambios-suplementos.service';
import { CreateCambiosSuplementoInput } from './dto/create-cambios-suplemento.input';

@Resolver(() => CambiosSuplementos)
export class CambiosSuplementosResolver {
  constructor(private readonly cambiosSuplementosService: CambiosSuplementosService) {}

  @Mutation(() => CambiosSuplementos)
  createCambiosSuplemento(@Args('createCambiosSuplementoInput') createCambiosSuplementoInput: CreateCambiosSuplementoInput) {
    return this.cambiosSuplementosService.save(createCambiosSuplementoInput);
  }

  @Query(() => [CambiosSuplementos])
  findAllCambiosSuplementos() {
    return this.cambiosSuplementosService.findAll();
  }

  @Query(() => CambiosSuplementos)
  findOneCambiosSuplementos(@Args('id', { type: () => Int }) id: number) {
    return this.cambiosSuplementosService.findOne(id);
  }

  @Mutation(() => CambiosSuplementos)
  removeCambiosSuplemento(@Args('id', { type: () => Int }) id: number) {
    return this.cambiosSuplementosService.remove(id);
  }

  @Mutation(() => [CambiosSuplementos])
  removeSeveralCambiosSuplemento(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.cambiosSuplementosService.removeSeveral(id);
  }
}
