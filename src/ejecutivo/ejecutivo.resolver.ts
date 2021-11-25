import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EjecutivoService } from './ejecutivo.service';
import { CreateEjecutivoInput } from './dto/create-ejecutivo.input';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';

@Resolver(() => Ejecutivos)
export class EjecutivoResolver {
  constructor(private readonly ejecutivoService: EjecutivoService) {}

  @Mutation(() => Ejecutivos)
  createEjecutivo(@Args('createEjecutivoInput') createEjecutivoInput: CreateEjecutivoInput) {
    return this.ejecutivoService.save(createEjecutivoInput);
  }

  @Query(() => [Ejecutivos])
  findAllEjecutivos() {
    return this.ejecutivoService.findAll();
  }

  @Query(() => Ejecutivos)
  findOneEjecutivo(@Args('id', { type: () => Int }) id: number) {
    return this.ejecutivoService.findOne(id);
  }

  @Mutation(() => Ejecutivos)
  removeEjecutivo(@Args('id', { type: () => Int }) id: number) {
    return this.ejecutivoService.remove(id);
  }
}
