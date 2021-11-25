import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EjecutivoService } from './ejecutivo.service';
import { Ejecutivo } from './entities/ejecutivo.entity';
import { CreateEjecutivoInput } from './dto/create-ejecutivo.input';
import { UpdateEjecutivoInput } from './dto/update-ejecutivo.input';

@Resolver(() => Ejecutivo)
export class EjecutivoResolver {
  constructor(private readonly ejecutivoService: EjecutivoService) {}

  @Mutation(() => Ejecutivo)
  createEjecutivo(@Args('createEjecutivoInput') createEjecutivoInput: CreateEjecutivoInput) {
    return this.ejecutivoService.create(createEjecutivoInput);
  }

  @Query(() => [Ejecutivo], { name: 'ejecutivo' })
  findAll() {
    return this.ejecutivoService.findAll();
  }

  @Query(() => Ejecutivo, { name: 'ejecutivo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ejecutivoService.findOne(id);
  }

  @Mutation(() => Ejecutivo)
  updateEjecutivo(@Args('updateEjecutivoInput') updateEjecutivoInput: UpdateEjecutivoInput) {
    return this.ejecutivoService.update(updateEjecutivoInput.id, updateEjecutivoInput);
  }

  @Mutation(() => Ejecutivo)
  removeEjecutivo(@Args('id', { type: () => Int }) id: number) {
    return this.ejecutivoService.remove(id);
  }
}
