import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Contenedores } from 'src/models/entities/Contenedores.entity';
import { ContenedoresService } from './contenedores.service';
import { CreateContenedoreInput } from './dto/create-contenedore.input';

@Resolver(() => Contenedores)
export class ContenedoresResolver {
  constructor(private readonly contenedoresService: ContenedoresService) {}

  @Mutation(() => Contenedores)
  createContenedore(@Args('createContenedoreInput') createContenedoreInput: CreateContenedoreInput) {
    return this.contenedoresService.save(createContenedoreInput);
  }

  @Query(() => [Contenedores])
  findAllContenedores() {
    return this.contenedoresService.findAll();
  }

  @Query(() => Contenedores)
  findOneContenedores(@Args('id', { type: () => Int }) id: number) {
    return this.contenedoresService.findOne(id);
  }

  @Mutation(() => Contenedores)
  removeContenedores(@Args('id', { type: () => Int }) id: number) {
    return this.contenedoresService.remove(id);
  }

  @Mutation(() => [Contenedores])
  removeSeveralContenedores(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.contenedoresService.removeSeveral(id);
  }
}
