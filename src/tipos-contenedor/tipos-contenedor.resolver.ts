import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiposContenedorService } from './tipos-contenedor.service';
import { CreateTiposContenedorInput } from './dto/create-tipos-contenedor.input';
import { TiposContenedor } from 'src/models/entities/TiposContenedor.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => TiposContenedor)
export class TiposContenedorResolver {
  constructor(private readonly tiposContenedorService: TiposContenedorService) {}

  @Mutation(() => TiposContenedor)
  @UseGuards(new AuthGuard())
  createTiposContenedor(@Args('createTiposContenedorInput') createTiposContenedorInput: CreateTiposContenedorInput) {
    return this.tiposContenedorService.save(createTiposContenedorInput);
  }

  @Query(() => [TiposContenedor])
  @UseGuards(new AuthGuard())
  findAllTiposContenedor() {
    return this.tiposContenedorService.findAll();
  }

  @Query(() => TiposContenedor)
  @UseGuards(new AuthGuard())
  findOneTiposContenedor(@Args('id', { type: () => Int }) id: number) {
    return this.tiposContenedorService.findOne(id);
  }

  @Mutation(() => TiposContenedor)
  @UseGuards(new AuthGuard())
  removeTiposContenedor(@Args('id', { type: () => Int }) id: number) {
    return this.tiposContenedorService.remove(id);
  }

  @Mutation(() => [TiposContenedor])
  @UseGuards(new AuthGuard())
  removeSeveralTiposContenedor(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.tiposContenedorService.removeSeveral(id);
  }
}
