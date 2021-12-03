import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiposContenedorService } from './tipos-contenedor.service';
import { CreateTiposContenedorInput } from './dto/create-tipos-contenedor.input';
import { TiposContenedor } from 'src/models/entities/TiposContenedor.entity';

@Resolver(() => TiposContenedor)
export class TiposContenedorResolver {
  constructor(private readonly tiposContenedorService: TiposContenedorService) {}

  @Mutation(() => TiposContenedor)
  createTiposContenedor(@Args('createTiposContenedorInput') createTiposContenedorInput: CreateTiposContenedorInput) {
    return this.tiposContenedorService.save(createTiposContenedorInput);
  }

  @Query(() => [TiposContenedor])
  findAllTiposContenedor() {
    return this.tiposContenedorService.findAll();
  }

  @Query(() => TiposContenedor)
  findOneTiposContenedor(@Args('id', { type: () => Int }) id: number) {
    return this.tiposContenedorService.findOne(id);
  }

  @Mutation(() => TiposContenedor)
  removeTiposContenedor(@Args('id', { type: () => Int }) id: number) {
    return this.tiposContenedorService.remove(id);
  }
}
