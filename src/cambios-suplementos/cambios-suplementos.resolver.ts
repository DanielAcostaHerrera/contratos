import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { CambiosSuplementos } from 'src/models/entities/CambiosSuplementos.entity';
import { CambiosSuplementosService } from './cambios-suplementos.service';
import { CreateCambiosSuplementoInput } from './dto/create-cambios-suplemento.input';

@Resolver(() => CambiosSuplementos)
export class CambiosSuplementosResolver {
  constructor(private readonly cambiosSuplementosService: CambiosSuplementosService) {}

  @Mutation(() => CambiosSuplementos)
  @UseGuards(new AuthGuard())
  createCambiosSuplemento(@Args('createCambiosSuplementoInput') createCambiosSuplementoInput: CreateCambiosSuplementoInput) {
    return this.cambiosSuplementosService.save(createCambiosSuplementoInput);
  }

  @Query(() => [CambiosSuplementos])
  @UseGuards(new AuthGuard())
  findAllCambiosSuplementos() {
    return this.cambiosSuplementosService.findAll();
  }

  @Query(() => CambiosSuplementos)
  @UseGuards(new AuthGuard())
  findOneCambiosSuplementos(@Args('id', { type: () => Int }) id: number) {
    return this.cambiosSuplementosService.findOne(id);
  }

  @Mutation(() => CambiosSuplementos)
  @UseGuards(new AuthGuard())
  removeCambiosSuplemento(@Args('id', { type: () => Int }) id: number) {
    return this.cambiosSuplementosService.remove(id);
  }

  @Mutation(() => [CambiosSuplementos])
  @UseGuards(new AuthGuard())
  removeSeveralCambiosSuplemento(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.cambiosSuplementosService.removeSeveral(id);
  }
}
