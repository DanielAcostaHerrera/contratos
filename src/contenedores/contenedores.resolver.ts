import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Contenedores } from 'src/models/entities/Contenedores.entity';
import { ContenedoresService } from './contenedores.service';
import { CreateContenedoreInput } from './dto/create-contenedore.input';

@Resolver(() => Contenedores)
export class ContenedoresResolver {
  constructor(private readonly contenedoresService: ContenedoresService) {}

  @Mutation(() => Contenedores)
  @UseGuards(new AuthGuard())
  createContenedore(@Args('createContenedoreInput') createContenedoreInput: CreateContenedoreInput) {
    return this.contenedoresService.save(createContenedoreInput);
  }

  @Query(() => [Contenedores])
  @UseGuards(new AuthGuard())
  findAllContenedores() {
    return this.contenedoresService.findAll();
  }

  @Query(() => Contenedores)
  @UseGuards(new AuthGuard())
  findOneContenedores(@Args('id', { type: () => Int }) id: number) {
    return this.contenedoresService.findOne(id);
  }

  @Mutation(() => Contenedores)
  @UseGuards(new AuthGuard())
  removeContenedores(@Args('id', { type: () => Int }) id: number) {
    return this.contenedoresService.remove(id);
  }

  @Mutation(() => [Contenedores])
  @UseGuards(new AuthGuard())
  removeSeveralContenedores(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.contenedoresService.removeSeveral(id);
  }
}
